const supertest = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  //1

  it("validar que GET de cafes retorne un 200 como statusCode", async () => {
    const { body, status } = await supertest(server).get("/cafes").send();

    const resultado = body;
    expect(resultado).toBeInstanceOf(Array);
    expect(resultado.length).toBeGreaterThanOrEqual(1);
    expect(status).toBe(200);
  });

  //2


  it("Eliminando un producto", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = 6;
    const resultado = await supertest(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
    //  const ids = body.map(c => c.id)
    //  expect(ids).not.toContain(idDeProductoAEliminar);
    expect(resultado.statusCode).toBe(404);
  });

  //3

  it("validar correcta creacion de un producto", async () => {
    const nuevoCafe = {
      id: 5,
      nombre: "moccachino",
    };
    const resultado = await supertest(server).post("/cafes").send(nuevoCafe);
    expect(resultado.statusCode).toBe(201);
    // le envio el producto nuevo y tiene que tenerlo contenido en la base de datos
    expect(resultado.body).toContainEqual(nuevoCafe);
  });
  //4

  it("actualizacion producto", async () => {
    const diferenteCafe = {
      id: 6,
      nombre: "frapuccino",
    };
   // const idParams = 5;
    const resultado = await supertest(server).put(`/cafes/5`).send(diferenteCafe);
    expect(resultado.statusCode).toBe(400);
  });

});
