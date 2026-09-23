const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const createCrudController = require('../controllers/genericController');

const About = require('../models/About');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');

const mount = (path, Model, opts = {}) => {
  const ctrl = createCrudController(Model, opts);
  const sub = express.Router();

  sub.get('/', ctrl.getAll);
  if (!opts.singleton) sub.get('/:id', ctrl.getOne);

  sub.post('/', protect, ctrl.create);
  sub.put(opts.singleton ? '/' : '/:id', protect, ctrl.update);
  if (!opts.singleton) sub.delete('/:id', protect, ctrl.remove);

  router.use(path, sub);
};

mount('/about', About, { singleton: true });
mount('/skills', Skill);
mount('/projects', Project);
mount('/blogs', Blog);
mount('/experience', Experience);
mount('/testimonials', Testimonial);
mount('/services', Service);

module.exports = router;