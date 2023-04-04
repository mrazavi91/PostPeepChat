const PeepChitter = require("../model/peepModel.js");
const chitterUser = require("../model/model.js");
const mongoose = require("mongoose");




const getPeeps = async (req,res)=>{
    const peeps = await PeepChitter.find({}).sort({ createdAt: -1 })
    res.status(200).json(peeps)
};

const getPeep = async (req,res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such peep' })
    }
    const peep = await PeepChitter.findById(id);
    if (!peep) {
        return res.status(404).json({ error: 'No such peep' })
    }

    res.status(200).json(peep)
};

const createPeep = async (req, res) => {
    const { text } = req.body;
    console.log(text)
    let empty = [];
    
    if (!text) {
        empty.push('text')
    }
    if (empty.length > 0 ) {
        return res.status(400).json({error: 'please fill up the field' , empty})
    }
    // add to the database
    try {
        const user_id = req.user._id
        const userUsername = req.userUsername.username
         const peep = await PeepChitter.create({ text , user_id, userUsername})
        res.status(200).json(peep)
    } catch (error) {
        res.status(400).json(error)
    }

};
const deletePeep = async (req,res)=>{
    const { id } = req.params;
    const { username } = req.body
    //check valuable
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such peep validation' })
    }

    
        const peep = await PeepChitter.findByIdAndDelete({ _id: id })
        
    
   
    
    
    if (!peep) {
        return res.status(400).json({ error: 'No such peep' })
    }

    res.status(200).json(peep)

};

module.exports = {
    getPeeps,
    getPeep,
    createPeep,
    deletePeep
};
