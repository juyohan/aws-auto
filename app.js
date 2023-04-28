"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const sendData = {
    name: "his"
};
// app.get("/get", (req: Request, res: Response) => {
//     res.send(sendData)
// })
app.post("/get", (req, res) => {
    try {
        const item = req.body;
        console.log(req.body);
        res.status(200).send(sendData);
    }
    catch (err) {
        console.log(err);
    }
});
app.listen(8000);
