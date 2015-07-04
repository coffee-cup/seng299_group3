$('#sch-calendar').datepicker({

});

$('#sch-calendar').datepicker()
  .on('changeDate', function(e) {
    $("#my_hidden_input").val(
        $("#datepicker").datepicker('getFormattedDate')
     );
  });

$('#sch-calendar').datepicker('setDate', new Date(2001, 0, 4));
