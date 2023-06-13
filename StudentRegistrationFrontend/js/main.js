$(document).ready(function () {
  // change to appropriate endpoint
  const apiUrl = "http://localhost:8181/students";
  let students = [];
  let searchValue = "";

  // add student
  $("#student-form").on("submit", async function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const age = $("#age").val();
    const mobile = $("#mobile").val();

    const student = { name, age, mobile };

    try {
      const response = await addStudent(apiUrl, student);
      if (response.ok) {
        const newStudent = await response.json();
        students.push(newStudent);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }

    $("#name").val("");
    $("#age").val("");
    $("#mobile").val("");

    renderStudents();
  });

  $("#search").on("input", function () {
    searchValue = $(this).val();
    renderStudents();
  });

  // doesn't currently fetch from API, just locally
  function renderStudents() {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    $("#student-list").empty();

    filteredStudents.forEach((student, index) => {
      const row = $("<tr>");

      $("<td>").text(student.name).appendTo(row);
      $("<td>").text(student.age).appendTo(row);
      $("<td>").text(student.mobile).appendTo(row);

      const actionCell = $("<td>");

      $("<button>")
        .text("Edit")
        .addClass("btn btn-sm btn-primary")
        .data("index", index)
        .appendTo(actionCell);

      $("<button>")
        .text("Delete")
        .addClass("btn btn-sm btn-danger")
        .data("index", index)
        .appendTo(actionCell);

      actionCell.appendTo(row);

      row.appendTo("#student-list");
    });
  }

  // edit button event listener
  $("#student-list").on("click", ".btn-primary", function () {
    const index = $(this).data("index");
    const student = students[index];

    $("#name").val(student.name);
    $("#age").val(student.age);
    $("#mobile").val(student.mobile);

    $("tr").removeClass("editing");
    $(this).closest("tr").addClass("editing");

    $("#register").hide();
    $("#update").show().data("index", index);
  });

  // update button event listener
  $("#update").on("click", async function (event) {
    event.preventDefault();

    const index = $(this).data("index");
    const student = students[index];

    const updatedStudent = {
      name: $("#name").val(),
      age: $("#age").val(),
      mobile: $("#mobile").val(),
    };

    try {
      const response = await updateStudent(
        apiUrl + "/" + student.id,
        updatedStudent
      );

      if (response.ok) {
        students[index] = updatedStudent;
        renderStudents();

        $("#name").val("");
        $("#age").val("");
        $("#mobile").val("");

        $("#update").hide();
        $("#register").show();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  });

  // delete button event listener
  $("#student-list").on("click", ".btn-danger", async function () {
    const index = $(this).data("index");
    const student = students[index];

    try {
      const response = await deleteStudent(apiUrl + "/" + student.id);

      if (response.ok) {
        students.splice(index, 1);
        renderStudents();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  });

  // POST
  async function addStudent(url = "", student = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    return response;
  }

  // PUT
  async function updateStudent(url = "", student = {}) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    return response;
  }
  // DELETE
  async function deleteStudent(url = "") {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return response;
  }
});
