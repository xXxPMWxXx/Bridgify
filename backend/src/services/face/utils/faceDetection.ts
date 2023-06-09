const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");

export const faceDetectionNet = faceapi.nets.ssdMobilenetv1
// export const faceDetectionNet = tinyFaceDetector

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
const inputSize = 408
const scoreThreshold = 0.5

function getFaceDetectorOptions(net: any) {
  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

export const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)