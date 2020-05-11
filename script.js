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
      if ($('#alert-if-not-exist').prop('checked')) {
        var node = $('#student-score-container').find('div[data-id="'+$('.latest').data('prev')+'"]');
        $('.latest').removeData('prev');
        $('.latest').removeAttr('data-prev');
        $('.latest').data('score', '');
        $('.latest').find('.score').html('');
        $('.latest').removeClass('latest');
        node.addClass('latest');
      } else {
        var node = $('#student-score-container').find('div[data-id="'+$('.latest').data('prev')+'"]');
        $('.latest').remove();
        node.addClass('latest');
      }
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
      if ($('#alert-if-not-exist').prop('checked')) {
        var node = $('#student-score-container').find('div[data-id="'+$('.latest').data('prev')+'"]');
        $('.latest').removeData('prev');
        $('.latest').removeAttr('data-prev');
        $('.latest').data('score', '');
        $('.latest').find('.score').html('');
        $('.latest').removeClass('latest');
        node.addClass('latest');
      } else {
        var node = $('#student-score-container').find('div[data-id="'+$('.latest').data('prev')+'"]');
        $('.latest').remove();
        node.addClass('latest');
      }
      
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
            if ($('#s-'+student.val()).data('score') == null || $('#s-'+student.val()).data('score') == '') {
              updateRow(student.val(), scoreVal);
              student.val('');
              score.val('');
              student.focus();
            } else {
              $('#alert-sfx')[0].play();
              if (confirm('學號已存在，更新既有成績?')) {
                updateRow(student.val(), scoreVal);
                student.val('');
                score.val('');
                student.focus();
              }
            }
          } else {
            errorMsg('學號已存在!');
          }
        } else {
          if (studentIdLoaded) {
            errorMsg('學號不存在!');
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
      scoreVal = parseInt(score.val(), 10);
      if (studentIdLoaded) {
        if ($('#s-'+student.val()).length != 0) {
          if ($('#s-'+student.val()).data('score') == null || $('#s-'+student.val()).data('score') == '') {
            updateRow(student.val(), scoreVal);
            student.val('');
            score.val('');
            student.focus();
          } else {
            $('#alert-sfx')[0].play();
            if (confirm('學號已存在，更新既有成績?')) {
              updateRow(student.val(), scoreVal);
              student.val('');
              score.val('');
              student.focus();
            }
          }
        } else {
          errorMsg('學號不存在!')
        }
      } else {
        if ($('#s-'+student.val()).length != 0) {
          errorMsg('學號已存在!')
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
  var prev = $('.latest').data('id');
  $('.latest').removeClass('latest');
  var node = 
    `<div class="col-12 d-flex justify-content-around text-center student-score-cell latest" id="s-${student}" data-id="${student}" data-score="${score}" data-prev="${prev}">
      <span>${student}</span><span class="score">${score}</span><span><button type="button" class="btn btn-danger btn-sm" onclick="$('#s-${student}').remove()">刪除</button></span>
    </div>`;
  $(node).insertAfter('#student-score-container .student-score-header');
}

function updateRow(student, score) {
  var prev = $('.latest').data('id');
  $('.latest').removeClass('latest');
  var node = $('#s-'+student);
  node.data('score', score);
  node.data('prev', prev);
  node.addClass('latest');
  node.find('.score').html(score);
}

function exportCSV() {
  var rows = [];
  $('#student-score-container .student-score-cell').each(function(index, val) {
    // console.log([$(val).data('id'), checkEmpty($(val).data('score'))]);
    rows.push([$(val).data('id'), checkEmpty($(val).data('score'))]);
  });
  let csvContent = rows.map(e => e.join(",")).join("\n");
  var csvFile = new Blob([csvContent], {type:"text/csv"});
  var downloadLink = document.createElement("a");
  downloadLink.download = "student-score.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  // var encodedUri = encodeURI(csvContent);
  // console.log(encodedUri)
  // var link = document.createElement("a");
  // link.setAttribute("href", encodedUri);
  // link.setAttribute("download", "student-score.csv");
  // document.body.appendChild(link); // Required for FF

  // link.click(); // This will download the data file named "my_data.csv".
}

function checkEmpty(val) {
  if (val == null || val == '') {
    return '#N/A';
  } else {
    return val;
  }
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
  $('.latest').removeClass('latest');
  $('#student-score-container>div').each(function(index, el) {
    $(el).data('prev', '');
    $(el).removeAttr('data-prev');
  });
  $('#alert-if-not-exist').prop('checked', true);
  $('#student-id-modal').modal('toggle');
}

function errorMsg(msg) {
  $('#student-id').val('');
  $('#student-id').focus();
  $('#alert-sfx')[0].play();
  alert(msg);
}