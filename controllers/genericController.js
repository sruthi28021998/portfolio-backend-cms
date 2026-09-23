const createCrudController = (Model, { singleton = false } = {}) => ({
  getAll: async (req, res) => {
    try {
      if (singleton) {
        const doc = await Model.findOne();
        return res.json(doc || {});
      }
      const docs = await Model.find().sort({ createdAt: -1 });
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      if (singleton) {
        const doc = await Model.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return res.json(doc);
      }
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = createCrudController;