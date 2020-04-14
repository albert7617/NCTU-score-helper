$(document).ready(function() {
  var student = $('#student-id');
  var score = $('#score');
  var container = $('#student-score-container');

  student.on('keyup', function(event) {
    if ($(this).val().length >= parseInt($(this).attr('maxlength'))) {
      score.focus();
    }
  });

  student.on('keydown', function(event) {
    if (event.keyCode == 111) {
      student.val(''); 
      student.focus(); 
      return false;
    } else if (event.keyCode == 106) {
      score.val(''); 
      score.focus(); 
      return false;
    } else if (event.keyCode == 109) {
      $($('.student-score-cell')[0]).remove();
      return false;
    }
  });

  score.on('keydown', function(event) {
    if (event.keyCode == 111) {
      student.val(''); 
      student.focus(); 
      return false;
    } else if (event.keyCode == 106) {
      score.val(''); 
      score.focus(); 
      return false;
    } else if (event.keyCode == 109) {
      $($('.student-score-cell')[0]).remove();
      return false;
    }
  });

  score.on('keyup', function(event) {
    var maxScore100 = $('#max-score-100').prop('checked');
    var studentIdLoaded = $('#alert-if-not-exist').prop('checked');
    var scoreVal;
    if (maxScore100) {
      if ($(this).val().length == 2) {
        if ($('#s-'+student.val()).length != 0) {
          if (studentIdLoaded) {
            if ($(this).val() == '00') {
              scoreVal = 100;
            } else {
              scoreVal = parseInt(score.val(), 10);
            }
            updateRow(student.val(), scoreVal);
            student.val('');
            score.val('');
            student.focus();
          } else {
            alert('學號已存在!');
          }
        } else {
          if (studentIdLoaded) {
            alert('學號不存在!');
          } else {
            if ($(this).val() == '00') {
              scoreVal = 100;
            } else {
              scoreVal = parseInt(score.val(), 10);
            }
            insertRow(student.val(), scoreVal);
            student.val('');
            score.val('');
            student.focus();
          }
        }
      }
    }
    if (event.keyCode == 13) {
      if (studentIdLoaded) {
        if ($('#s-'+student.val()).length != 0) {
          updateRow(student.val(), scoreVal);
          student.val('');
          score.val('');
          student.focus();
        } else {
          alert('學號不存在!');
        }
      } else {
        if ($('#s-'+student.val()).length != 0) {
          alert('學號已存在!');
        } else {
          insertRow(student.val(), scoreVal);
          student.val('');
          score.val('');
          student.focus();
        }
      }
      return false;
    }
  }); 
});

function insertRow(student, score='') {
  var node = 
    `<div class="col-12 d-flex justify-content-around text-center student-score-cell" id="s-${student}" data-id="${student}" data-score="${score}">
      <span>${student}</span><span class="score">${score}</span><span><button type="button" class="btn btn-danger btn-sm" onclick="$('#s-${student}').remove()">刪除</button></span>
    </div>`;
  $(node).insertAfter('#student-score-container .student-score-header');
}

function updateRow(student, score) {
  var node = $('#s-'+student);
  node.data('score', score);
  node.find('.score').html(score);
}

function exportCSV() {
  var rows = [];
  $('#student-score-container .student-score-cell').each(function(index, val) {
    rows.push([$(val).data('id'), $(val).data('score')]);
  });
  let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "student-score.csv");
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}

function loadStudentId() {
  var student_id = [];
  switch($('input:radio[name="separator"]:checked').val()) {
    case 'newline':
      student_id = $('#student-id-textarea').val().split(/\r?\n/);
      break;
    case 'comma':
      student_id = $('#student-id-textarea').val().split(",");
      break;
  }
  student_id.forEach(element => insertRow(element.trim()));
  $('#alert-if-not-exist').prop('checked', true);
  $('#student-id-modal').modal('toggle');
}