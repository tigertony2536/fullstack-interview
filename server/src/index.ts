import express, { type Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Ticket, Discount } from "./type";
import { PrismaClient, Prisma } from "@prisma/client";

const client = new PrismaClient();

const app: Application = express();
const port: number = 8000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/tickets", async (req: Request, res: Response) => {
  try {
    const tickets = await client.ticket.findMany();
    console.log(tickets);
    res
      .status(200)
      .send({ message: "Get tickets successfully", data: tickets });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.get("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tickets = await client.ticket.findUnique({
      where: { id: Number(id) },
    });
    console.log("Get ticket with id ${id} successfully");
    res.status(200).send({
      message: `Get ticket with id ${id} successfully`,
      data: tickets,
    });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.post("/tickets", async (req: Request, res: Response) => {
  const data = req.body as Ticket[];
  const dataArray = data.map((ticket) => {
    return {
      title: ticket.title,
      description: ticket.description,
      img: ticket.img,
      price: ticket.price,
      inCart: ticket.inCart,
    };
  });
  try {
    const createAmount = await client.ticket.createMany({
      data: dataArray,
    });
    console.log("Create" + createAmount + "records");
    res
      .status(200)
      .send({ message: `create ${createAmount.count} ticket(s) successfully` });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.put("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as Ticket;
  try {
    const ticket = await client.ticket.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        img: data.img,
        price: data.price,
        inCart: data.inCart,
      },
    });
    console.log("Update ticket Successfully");
    res
      .status(200)
      .send({ message: "Update ticket Successfully", data: ticket });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.delete("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await client.ticket.delete({
      where: { id: Number(id) },
    });
    console.log(`Delete ticket with id ${id} Successfully:`, ticket);
    res.status(200).send({
      message: `Delete ticket with id ${id} Successfully:`,
      data: ticket,
    });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.get("/discounts", async (req: Request, res: Response) => {
  try {
    const discounts = await client.discount.findMany();
    console.log(discounts);
    res
      .status(200)
      .send({ message: "Get discounts successfully", data: discounts });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.get("/discounts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const discount = await client.discount.findUnique({
      where: { id: Number(id) },
    });
    console.log(discount);
    res.status(200).send({
      message: `Get discount with id ${id} successfully`,
      data: discount,
    });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.post("/discounts", async (req: Request, res: Response) => {
  const data = req.body as Discount[];
  try {
    const dataArray = data.map((discount) => {
      return {
        code: discount.code,
        discount: discount.discount,
        type: discount.type,
      };
    });
    const createAmount = await client.discount.createMany({
      data: dataArray,
    });
    console.log("Create" + createAmount + "records");
    res.status(200).send({
      message: `create ${createAmount.count} discount(s) successfully`,
    });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.put("/discounts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as Discount;
  try {
    const discount = await client.discount.update({
      where: { id: Number(id) },
      data: {
        code: data.code,
        discount: data.discount,
        type: data.type,
      },
    });
    console.log("Update discount Successfully");
    res
      .status(200)
      .send({ message: "Update discount Successfully", data: discount });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});

app.delete("/discounts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const discount = await client.discount.delete({
      where: { id: Number(id) },
    });
    console.log(`Delete discount with id ${id} Successfully:`, discount);
    res.status(200).send({
      message: `Delete discount with id ${id} Successfully:`,
      data: discount,
    });
  } catch (error) {
    console.log((error as Prisma.PrismaClientKnownRequestError).message);
  }
});
app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
