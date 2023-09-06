$(document).ready(function () {
  let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
  $("#Addbtn").click(function () {
    if ($("#FirstName").val() && $("#LastName").val()) {
      let formData = {
        fName: $("#FirstName").val(),
        lName: $("#LastName").val(),
      };
      if (!Array.isArray(formDataArray)) {
        formDataArray = [];
      }
      formDataArray.push(formData);
      localStorage.setItem("formData", JSON.stringify(formDataArray));

      $("#FirstName").val("");
      $("#LastName").val("");
      $("#tablebody").empty();
      $table();
    } else {
      alert("Please enter the values");
    }
  });

  $table = function () {
    for (let i = 0; i < formDataArray.length; i++) {
      let newRow = $(`<tr>
      <td>
        <ol>
          <li id="tID">${i + 1}</li>
        </ol>
      </td>
      <td id="fName">${formDataArray[i].fName}</td>
      <td id="lName">${formDataArray[i].lName}</td>

      <td>
        <button id="editbtn">Edit</button>
        <button id="dltbtn">delete</button>
      </td>
    </tr>`);
      $("#tablebody").append(newRow);
    }
  };
  $(".main-table").on("click", "#dltbtn", function () {
    const row = $(this).closest("tr");
    const index = row.index();
    formDataArray.splice(index, 1);
    row.remove();
    localStorage.setItem("formData", JSON.stringify(formDataArray));
    $(".edit-form").addClass("hide");
  });
  $(".main-table").on("click", "#editbtn", function () {
    $(".edit-form").toggleClass("hide");
    const fNameValue = $(this).closest("tr").find("#fName").text();
    $("#FirstNameedit").val(fNameValue);
    const lNameValue = $(this).closest("tr").find("#lName").text();
    $("#LastNameedit").val(lNameValue);
    updateindex = $(this).closest("tr").find("#tID").text();
  });
  $("#upbtn").click(function update() {
    if ($("#FirstNameedit").val() && $("#LastNameedit").val()) {
      formDataArray[updateindex - 1].fName = $("#FirstNameedit").val();
      formDataArray[updateindex - 1].lName = $("#LastNameedit").val();
      $(".edit-form").addClass("hide");
      $("#tablebody").empty();
      $table();
    } else {
      alert("Please enter the values");
    }
  });
  $("form").on("submit", function (e) {
    e.preventDefault();
  });
});
