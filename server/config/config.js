// PUERTO

process.env.PORT = process.env.PORT || 4000;

// ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb+srv://mochi:R5i3nqb8fZYBQjGW@bqback-5moin.mongodb.net/test?retryWrites=true&w=majority";
}

process.env.URLDB = urlDB;
