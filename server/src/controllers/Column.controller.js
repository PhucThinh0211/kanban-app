const ColumnService = require("../services/Column.service");

async function getAll(req, res, next) {
  try {
    res.json(await ColumnService.getAll());
  } catch (err) {
    console.error(`Error while getting columns`, err.message);
    next(err);
  }
}

async function createColumn(req, res, next) {
  try {
    const body = req.body;
    res.json(await ColumnService.create(body));
  } catch (err) {
    console.error(`Error while creating columns`, err.message);
    next(err);
  }
}

async function removeColumn(req, res, next) {
  try {
    res.json(await ColumnService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting column`, err.message);
    next(err);
  }
}

async function addTicket(req, res, next) {
  try {
    const columnId = req.params.id;
    const ticket = req.body;

    const result = await ColumnService.addTicket(columnId, ticket);

    res.json(result);
  } catch (err) {
    console.error(`Error while add ticket to column`, err.message);
    next(err);
  }
}

async function updateTicket(req, res, next) {
  try {
    const columnId = req.params.id;
    const ticketId = req.params.ticketId;
    const newTicket = req.body;

    res.json(
      await ColumnService.updateTicket(columnId, {
        ...newTicket,
        id: ticketId,
      })
    );
  } catch (err) {
    console.error(`Error while update ticket`, err.message);
    next(err);
  }
}

async function removeTicket(req, res, next) {
  try {
    const columnId = req.params.id;
    const ticketId = req.params.ticketId;

    res.json(await ColumnService.removeTicket(columnId, ticketId));
  } catch (err) {
    console.error(`Error while remove ticket`, err.message);
    next(err);
  }
}
async function moveTicketToColumn(req, res, next) {
  try {
    const oldColumnId = req.params.id;
    const columnId = req.body.columnId;
    const ticketId = req.body.ticketId;

    const result = await ColumnService.moveTicketToColumn(
      columnId,
      oldColumnId,
      ticketId
    );
    res.json({ success: !!result });
  } catch (err) {
    console.error(`Error while move ticket`, err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  createColumn,
  removeColumn,
  addTicket,
  updateTicket,
  removeTicket,
  moveTicketToColumn,
};
