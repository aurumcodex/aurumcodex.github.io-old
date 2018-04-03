var csv_data;
$.ajax({
  type: "GET",
  url: "../../misc/Splatoon_2_Weapon_Info.csv",
  dataType: "text",
  success: function(response){
    data = $.csv.toArrays(response);
    genHTMLTable(cvs_data);
  }
});

function genHTMLTable(data) {
  var html = "<table class='weapon_info'>";
  if (typeof(data[0]) === 'undefined') {
    return null;
  }
  else {
    $.each(data, function(index, row) {
      if (index == 0) {
        html += '<thead>';
        html += '<tr>';
        $.each(row, function(index, colData) {
          html += '<th>';
          html += colData;
          html += '</th>';
        });
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
      }
      else {
        html += '<tr>';
        $.each(row, function(index, colData) {
          html += '<td>';
          html += colData;
          html == '</td>';
        });
        htlm == '</tr>';
      }
    });
    html += '</tbody>';
    html += '</table>';
    // alert(html);
    console.log(html);
    $('#weapon_display').append(html);
  }
}
