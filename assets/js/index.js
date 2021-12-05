const port = 3000;
const adrs = '65.0.184.222'

$("#add").submit( function (event) {
    alert("Data inserted successfully!");
});

$("#update").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://${adrs}:${port}/api/update/${data.allocation}/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/" || window.location.pathname == "/home"){
    $ondelete = $("#delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var allocation = $(this).attr("data-allocation")

        var request = {
            "url" : `http://${adrs}:${port}/api/delete/${allocation}/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
            .error((e)=>{
                console.log(e)
            })
        }

    })
}
