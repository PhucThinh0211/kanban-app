const ColumnController = require("../controllers/Column.controller");

const express = require("express");
const router = express.Router();

router.get("/", ColumnController.getAll);
router.post("/", ColumnController.createColumn);
router.delete("/:id", ColumnController.removeColumn);

router.post("/:id/ticket", ColumnController.addTicket);
router.put("/:id/ticket/:ticketId", ColumnController.updateTicket);
router.delete("/:id/ticket/:ticketId", ColumnController.removeTicket);

router.put("/:id/moveTicket", ColumnController.moveTicketToColumn);

module.exports = router;
