const Employee = require('../models/Employee');

// Show the list of Employees
const index = (req, res, next) => {
  if(req.query.page && req.query.limit){
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit})
    .then(response => {
      res.status(200).json({
        response
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
  } else {
    Employee.find()
    .then(response => {
      res.status(200).json({
        response
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
  }

    /*
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    });
    */
}

// Show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error => {
    res.json({
      message: "An error Occured!"
    })
  });
};

// add new employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age
  });
  // if(req.file){
  //   employee.avatar = req.file.path;
  // }

  if(req.files) {
    let path = '';
    req.files.forEach(function (files, index, arr){
      path = path + files.path + ',';
    });
    path = path.substring(0, path.lastIndexOf(","));
    employee.avatar = path;
  }

  employee.save()
  .then(response => {
    res.json({
      message: 'Employee added successfully!'
    });
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    });
  });
}

// update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updateData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age
  }

  Employee.findByIdAndUpdate(employeeID, {$set: updateData})
  .then(() => {
    res.json({
      message: "Employee updated successfully!"
    });
  })
  .catch(error => {
    res.json({
      message: "An error Occured!"
    })
  })
}

// delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
  .then(() => {
    res.json({
      message: "Employee deleted successfully!"
    });
  })
  .catch(error => {
    res.json({
      message: "An error Occured!"
    })
  });
}

module.exports = {
  index, show, store, update, destroy
}
