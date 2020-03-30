$(document).ready(function() {
  var student = $('#student-id');
  var score = $('#score');
  var container = $('#student-score-container');
  var maxScore100 = $('#max-score-100');

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
    if (maxScore100.prop('checked')) {
      if ($(this).val().length == 2) {
        if ($('#s-'+student.val()).length != 0) {
          alert('學號已存在!');
        } else {
          if ($(this).val() == '00') {
            var scoreVal = 100;
          } else {
            var scoreVal = score.val();
          }
          var node = 
            `<div class="col-12 d-flex justify-content-around text-center student-score-cell" id="s-${student.val()}" data-id="${student.val()}" data-score="${scoreVal}">
              <span>${student.val()}</span><span>${scoreVal}</span><span><button type="button" class="btn btn-danger btn-sm" onclick="$('#s-${student.val()}').remove()">刪除</button></span>
            </div>`;
          $(node).insertAfter('#student-score-container .student-score-header');
          student.val('');
          score.val('');
          student.focus();
        }
      }
    }
    if (event.keyCode == 13) {
      if ($('#s-'+student.val()).length != 0) {
        alert('學號已存在!');
      } else {
        var node = 
          `<div class="col-12 d-flex justify-content-around text-center student-score-cell" id="s-${student.val()}" data-id="${student.val()}" data-score="${score.val()}">
            <span>${student.val()}</span><span>${score.val()}</span><span><button type="button" class="btn btn-danger btn-sm" onclick="$('#s-${student.val()}').remove()">刪除</button></span>
          </div>`;
        $(node).insertAfter('#student-score-container .student-score-header');
        student.val('');
        score.val('');
        student.focus();
      }
      return false;
    }
  }); 
});

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