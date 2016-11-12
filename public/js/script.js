var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

for (var i = 0; i < channels.length; i++) {
    $.ajax({
        url: "https://wind-bow.hyperdev.space/twitch-api/streams/"+channels[i],
        dataType: "jsonp",
        cache: false,
        indexValue: i,
        success: function(data){
            /*------ passing user data and index ------*/
            check_user(data , this.indexValue);
          
            /*----- Check if user is online or offline*/
            function check_user (data, i) {
                console.log(data);
                if(data.stream) {
                    console.log(channels[i] + ' is online\n');
                    $('.all, .online').append(
                        "<div class='channel user-online'>"+
                        "<div class='image'><img class='img-responsive' src="+data.stream.channel.logo+" /></div>"+
                        "<div class='name'><a target='_blank' href='"+data.stream.channel.url+"'>"+channels[i]+"</a></div>"+
                        "<div class='status'><p>"+data.stream.channel.game+"<span>: "+data.stream.channel.status+"</span></p></div>"+
                        "</div>"
                    );
                } 

                else {
                    console.log(channels[i] +' is off-line\n');
                    $.ajax({
                        url: 'https://wind-bow.hyperdev.space/twitch-api/channels/'+channels[i],
                        dataType: 'jsonp',
                        cache: false,
                        success: function(data){
                            console.log(data);
                            $('.all, .offline').append(
                                "<div class='channel user-offline'>"+
                                "<div class='image'><img class='img-responsive' src="+data.logo+" /></div>"+
                                "<div class='name'><a target='_blank' href='"+data.url+"'>"+channels[i]+"</a></div>"+
                                "<div class='status'><p>Offline</p></div>"+
                                "</div>"
                            )
                        }
                    })
                }
            }
        }
    }); 
}