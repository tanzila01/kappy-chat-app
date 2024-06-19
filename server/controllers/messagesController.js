const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      console.log("req.body", req.body)
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.send(projectedMessages);
      console.log("messages", projectedMessages)
    } catch (ex) {
      next(ex);
    }
  };

//other message sending format that is working also

// module.exports.addMessage = async (req, res, next) => {
//     try {
//         console.log("req.body", req.body)
//       const { from, to, message } = req.body;
//       const data = await Messages.create({
//         message: { text: message },
//         users: [from, to],
//         sender: from,
//       });
  
//       if (data) return res.json({ msg: "Message added successfully." });
//       else return res.json({ msg: "Failed to add message to the database" });
//     } catch (ex) {
//       next(ex);
//     }
//   };

module.exports.addMessage = async (req, res) => {
  try {
    console.log("req.body", req.body)
    const { from, to, message } = req.body;
    const newMessage = new Messages();
    newMessage.message.text = message
    newMessage.users = [from, to]
    newMessage.sender = from
    console.log("newMessage", newMessage)
    const sendMessage = await newMessage.save(); 
    if (sendMessage){
        res.send({sendMessage})
    }
  } 
  catch (ex) {
      console.log(ex)
  }
};