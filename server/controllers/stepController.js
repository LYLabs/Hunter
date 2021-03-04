const db = require('../models/model.js');
//const { sendEmail } = require('../emails/accounts');

const stepController = {};

stepController.getAllSteps = (req, res, next) => {
  const { app_id } = req.params;
  const getStepData = `SELECT * FROM steps WHERE app_id = $1 ORDER BY id ASC`;
  db.query(getStepData, [app_id])
    .then((data) => {
      res.locals.stepData = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('getallsteps err--->', err);
      return next({
        log:
          'stepController.getAllSteps: ERROR: Error getting steps from database',
        message: {
          err: err.message,
        },
      });
    });
};

stepController.addStep = (req, res, next) => {
  const {
    appId,
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  } = req.body;

  console.log('addstep res.locals===>', res.locals.user);

  const addStepText = `INSERT INTO steps 
  (app_id, date, step_type, contact_name, contact_role, contact_info, notes) 
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const addStepValues = [
    appId,
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  ];

  db.query(addStepText, addStepValues)
    .then((data) => {
      console.log('data.row==>', data.rows);
      return next();
    })
    .catch((err) => {
      console.log('addstep err-->', err);
      return next({
        log: 'stepController.addStep: ERROR: Error writing to database',
        message: {
          err: err.message,
        },
      });
    });
};
stepController.deleteStep = (req, res, next) => {
  const queryText = `DELETE FROM steps WHERE id = $1 RETURNING *`;
  const queryVal = [req.params.step_id];

  db.query(queryText, queryVal)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('delete err===>', err);
      return next({
        log:
          'stepsController.deleteStep: ERROR: Error deleting application from database',
        message: {
          err: err.message,
        },
      });
    });
};

stepController.editStep = (req, res, next) => {
  const {
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  } = req.body;

  const queryText = `UPDATE steps SET 
  date = $1, 
  step_type = $2, 
  contact_name = $3, 
  contact_role = $4, 
  contact_info = $5, 
  notes = $6
  WHERE id = $7

  RETURNING *
  `;

  const queryVals = [
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
    Number(req.params.step_id),
  ];
  console.log('stepID===>', req.params.step_id);

  db.query(queryText, queryVals)
    .then((data) => {
      // res.locals.step = data.rows;
      console.log('edit step res.locals====>', res.locals);

      //email functionality is temporarily commented out

      // const { first_name, email } = res.locals.user;
      // const { step_type, contact_name, date } = res.locals.step[0];
      // //console.log('step DATA====>', data.rows);
      // sendEmail(email, first_name, step_type, date, contact_name);
      return next();
    })
    .catch((err) => {
      console.log('editstep err--->', err);
      return next({
        log:
          'stepController.updateStep: ERROR: Error updating application in database',
        message: {
          err: err.message,
        },
      });
    });
};

module.exports = stepController;
