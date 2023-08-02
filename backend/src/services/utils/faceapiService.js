const save = require("./saveFile");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const canvas = require("canvas");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const modelPathRoot = "../../faceAPIModel";
const FaceModel = require('../../models/face');
const baseDir = path.resolve(__dirname, "../../..");
let optionsSSDMobileNet;

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function image(file) {
  const decoded = tf.node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function detect(tensor) {
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
  return result;
}

async function main(file, filename) {
  console.log("FaceAPI single-process test");

  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();

  console.log(
    `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${faceapi.version.faceapi
    } Backend: ${faceapi.tf?.getBackend()}`
  );

  console.log("Loading FaceAPI models");
  const modelPath = path.join(__dirname, modelPathRoot);

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  });

  const tensor = await image(file);
  const result = await detect(tensor);
  console.log("Detected faces:", result.length);

  // ---
  try {
    // Get all the face data from mongodb and loop through each of them to read the data
    let faces = await FaceModel.find();

    for (let i = 0; i < faces.length; i++) {
      // Change the face data descriptors from Objects to Float32Array type
      for (let j = 0; j < faces[i].descriptions.length; j++) {
        faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
      }
      // Turn the DB face docs to
      faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].label, faces[i].descriptions);
    }

    // Load face matcher to find the matching face
    const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

    // Read the image using canvas or other method
    const img = await canvas.loadImage(file);

    let temp = faceapi.createCanvasFromMedia(img);
    // Process the image for the model
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(temp, displaySize);

    // Find matching faces
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const queryDrawBoxes = detections.map(res => {
      const bestMatch = faceMatcher.findBestMatch(res.descriptor)
      return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
    })
    const outQuery = faceapi.createCanvasFromMedia(img)
    queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
    save.saveFile(filename, outQuery.toBuffer('image/jpeg'));
    // const canvasImg = await canvas.loadImage(file);
    // const out = await faceapi.createCanvasFromMedia(canvasImg);
    // faceapi.draw.drawDetections(out, result);
    // save.saveFile(filename, out.toBuffer("image/jpeg"));
    // console.log(`done, saved results to ${filename}`);

  } catch (error) {
    console.log(error);
  }


  tensor.dispose();

  return result;
}

module.exports = {
  detect: main,
};