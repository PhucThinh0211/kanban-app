const ColumnModel = require("../models/Column.schema");

async function getAll() {
  try {
    const columns = await ColumnModel.find();
    return columns;
  } catch (err) {
    return [];
  }
}
async function create(column) {
  try {
    const newColumn = new ColumnModel(column);
    return await newColumn.save();
  } catch (err) {
    return null;
  }
}
async function remove(columnId) {
  try {
    return await ColumnModel.deleteOne({ _id: columnId });
  } catch (err) {
    return null;
  }
}
async function addTicket(columnId, ticket) {
  const column = await ColumnModel.findById(columnId);
  column.tickets.push(ticket);
  await column.save();

  return column;
}
async function updateTicket(columnId, newTicket) {
  const column = await ColumnModel.findById(columnId);

  let ticket = column.tickets.id(newTicket.id);

  if (ticket) {
    ticket.name = newTicket.name;
    ticket.description = newTicket.description;
    ticket.startDate = newTicket.startDate;
    ticket.endDate = newTicket.endDate;
    await column.save();
    return column;
  } else {
    return null;
  }
}
async function removeTicket(columnId, ticketId) {
  const column = await ColumnModel.findById(columnId);
  let ticket = column.tickets.id(ticketId);

  if (ticket) {
    ticket.deleteOne();
    await column.save();
    return column;
  } else {
    return null;
  }
}
async function moveTicketToColumn(newColumnId, oldColumnId, ticketId) {
  const column = await ColumnModel.findById(newColumnId);
  const oldColumn = await ColumnModel.findById(oldColumnId);
  let ticket = oldColumn.tickets.id(ticketId);

  if (ticket) {
    column.tickets.push(ticket);
    ticket.deleteOne();
    await oldColumn.save();
    await column.save();
    return true;
  } else {
    return null;
  }

  // if (ticket) {
  //   column.tickets.push(ticket);
  //   await column.save();
  //   // await ticket.deleteOne();
  //   return column;
  // } else {
  //   return null;
  // }
  // const ticket = await ColumnModel.find({ "tickets.ticket": ticketId });

  // if (ticket) {
  //   try {
  //     await addTicket(columnId, ticket);
  //     await removeTicket(columnId, ticketId);
  //     return true;
  //   } catch (error) {
  //     return null;
  //   }
  // } else {
  //   return null;
  // }
}
// async function getAll() {
//   try {
//     const columns = await ColumnModel.find();
//     return columns;
//   } catch (err) {
//     return [];
//   }
// }

module.exports = {
  getAll,
  create,
  remove,
  addTicket,
  updateTicket,
  removeTicket,
  moveTicketToColumn,
};
