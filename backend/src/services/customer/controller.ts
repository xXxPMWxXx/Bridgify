import { NextFunction, Request, Response } from 'express';

import { Customer } from '../../models';


//testing SQLite using Sequelize
const test = async () => {

    console.log("-------Insert---------");
    // await Customer.create({id:1234, name:"Hello"});
    console.log("-------Select---------");
    const customers = await Customer.findAll();
    console.log("All customers:", JSON.stringify(customers, null, 2));

    console.log("-------Update---------");
    await Customer.update({ name: "Updated Name 123" }, {
    	where: {
    	  id: 1234
    	}
      });

    console.log("-------Delete---------");



}

// test();

//HTTP GET
//http://{endpoint}/api/customer/
export const getAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const customers = await Customer.findAll();
    return res.json(customers);
};

//HTTP GET
//http://{endpoint}/api/customer/getCustomer/?id={input}
export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const cus = await Customer.findByPk(Number(req.query.id));
    if (cus == null) {
        return res.status(404)
            .json({ error: "Customer not found" });
    }
    return res.json(cus);
};
//HTTP POST
// http://{endpoint}/api/customer/addCustomer/
// input parameter in body 
export const addCustomer = async (req: Request, res: Response, next: NextFunction) => {
    await Customer.create(
        {
            id: Number(req.body.id),
            name: String(req.body.name),
            gender: String(req.body.gender),
            nationality: String(req.body.nationality),
            DOB: String(req.body.DOB)

        }
    ).catch(function (err) {
        // print the error details
        console.log(err);
        return res.status(404)
            .json({ error: "ID must be unique" });
    });
    return res.status(200).json({ Message: `Customer ID : ${req.body.id} added` });
};

//HTTP DELETE
// http://{endpoint}/api/customer/deleteCustomer/?id={input}
export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {

    const cus = await Customer.findByPk(Number(req.query.id));
    if (cus == null) {
        return res.status(404)
            .json({ Message: `Customer ID : ${req.query.id} does not exist in the DB` });
    }

    await Customer.destroy({
        where: {
            id: req.query.id
        }
    })
        .catch(function (err) {
            // print the error details
            return res.status(404)
                .json({ err });
        });
    return res.status(200).json({ Message: `Sucessful deleted Customer ID : ${req.query.id}` });
};

//HTTP PUT
// http://{endpoint}/api/customer/updateCustomer/
// input parameter in body 
export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const cus = await Customer.findByPk(Number(req.body.id));
    if (cus == null) {
        return res.status(404)
            .json({ Message: `Customer ID : ${req.body.id} does not exist in the DB` });
    }

    await cus.update({
        name: String(req.body.name),
        gender: String(req.body.gender),
        nationality: String(req.body.nationality),
        DOB: String(req.body.DOB)
    }).catch(function (err) {
        // print the error details
        return res.status(404)
            .json({ err });
    });

    return res.status(200).json({ Message: `Sucessful updated information for Customer ID : ${req.body.id}` });
};