     
		/** 播放器就绪，播放列表中第一个音频 **/
		function readyHandler() {
			//nextProgram();
		}
		
		/** 播放一个音频结束 **/
		function completeHandler( currentPlayMode )
		{
			//可以在这里处理联播
			if( currentPlayMode ==  playMode_TopPlayer.loopAll )	
				nextProgram();
			if( currentPlayMode ==  playMode_TopPlayer.loopRandom )	
				randomProgram();
		}
       		var currentIndex = -1;
	        var loopPlaylistId = "playlist2";
		
		function setProgram( i,jspaURL,programid,playlistId,advertising)
		{   
            
		    var encoderId = 0;	
			if( loopPlaylistId != playlistId )
			{
				changePlaylist( playlistId, i );
				return;
			}
			if( currentIndex == i ) return;
			if( i < 0 ) return;
			if( i > $( "#" + loopPlaylistId ).get(0).length  - 1 ) return;
			currentIndex = i; 
			if(playlistId=="playlist"){O("duojiName").innerHTML = "";}
			if(playlistId=="playlist2"){O("duojiName").innerHTML = "第"+(i+1)+"集";}
		if(programid==0){
		canCountDuration( true );
		  switchVodFunction_TopPlayer( ttxmmsURL, jspaURL, encoderId, terminalType,advertising );
		}else
		{
		canCountDuration( true );
		switchVodId_TopPlayer(ttxmmsURL,programid,jspaURL,terminalType,advertising);
		}
      
		}
		function changePlaylist( playlistId, listIndex )
		{
			loopPlaylistId = playlistId;
			currentIndex = listIndex - 1;
			nextProgram();
		}
		
		/** 下一个 **/
		function nextProgram()
		{
			var i = currentIndex;
			var total = document.getElementById( loopPlaylistId ).getElementsByTagName( "li" ).length;
			
			if( ++i > total - 1 )	i = 0;
          
			document.getElementById( loopPlaylistId ).getElementsByTagName( "li" )[i].click();
		}
		
		/** 上一个 **/
		function lastProgram()
		{
			var i = currentIndex;
			var total = document.getElementById( loopPlaylistId ).getElementsByTagName( "li" ).length;
			if( --i < 0 )	i = total  - 1;
			document.getElementById( loopPlaylistId ).getElementsByTagName( "li" )[i].click();
		}
		
		/** 随机 **/
		function randomProgram()
		{
			var total = document.getElementById( loopPlaylistId ).getElementsByTagName( "li" ).length;
			var i = Math.floor( Math.random() * total );
			if( i > total - 1 )	i = 0;
			
			document.getElementById( loopPlaylistId ).getElementsByTagName( "li" )[i].click();
		}
		
		
		/** 加入收藏 **/
		function addFavorite()
		{
          var contentid="{Shinyv:Request variable='request.id'}";
		  if(contentid!=""){
	     $.ajax({
             type: "POST",
              url: cisURL+"/index.php?post=Usercenter",
             dataType:"JSON",
             cache:false,
             data: {"action":"collect","userID":userID,"programID":programID,"programTitle":programTitle,"programUrl":programUrl,"programImg":programImg,"programMsg":programMsg},
            
            success: function(data){ 
	     
		       if(data.status==1){
				alert(data.message);
				
				}else{
				alert(data.message);
				}
		      }
             });}
		}
		
		/** 点击节目列表按钮 **/
		function onPlaylistClick()
		{
		}
	
///
 $("#listBtn").click(function(){
        var listmenu = $("#listBtn");
		var playlistbtn = $("#playlist");
	    var t_delay="";
		listmenu.mousedown(function(){
			t_delay= setTimeout(function(){
				playlistbtn.fadeIn("slow");
			},200);
		});
		listmenu.mouseleave(function(){
			clearTimeout(t_delay);
			playlistbtn.fadeOut("slow");
	});
	
       ///
	     
		   var userID = $.cookie('uid');
	      
	       if(userID==null){return false};
			var action="collectlist";
		      
			$.ajax({
             type: "POST",
             url: cisURL+"/index.php?post=Usercenter&offset=0&limit=30",
             dataType:"JSON",
             cache:false,
             data: {"action":action,"userID":userID},
			
			success: function(data){
		    $("#mylist").html("");
			$.each(data.result, function(i, item) {
				var playlist="playlist";
				$("#mylist").append(
               "<li onclick=playProgram("+i+","+item.programid+",'"+playlist+"')>"+item.programtitle+"</li>"
				  );
				 });
		
				  }
			   });
		   
			   })
///
$("#listJuji").click(function(){
        var listmenu = $("#listJuji");
		var playlistbtn = $("#playlist2");
	    var t_delay="";
		listmenu.mousedown(function(){
			t_delay= setTimeout(function(){
				playlistbtn.fadeIn("slow");
			},200);
		});
		listmenu.mouseleave(function(){
			clearTimeout(t_delay);
			playlistbtn.fadeOut("slow");
		});
    })
	 function playProgram(n,contentid,playlist){

			 document.getElementById('topcid').value =contentid;
			 
			 var url = cisURL+"/api/pcservices.php?action=get_playurl&id="+contentid;
			
			  $.ajax({
						type:'post',
						dataType:'json',
						url:url,
						data:null,
						success:function(result){
						var programid="";
						programid=result.programid;
					  
					if (typeof(programid) == "undefined"){
						programid=0;
						encoderId=0;
						$.each(result.play_url, function(i, item) {
						var jspaURL=item.stream_url;
						if(i==0){
						
						setProgram(n,jspaURL,programid,playlist);
					
						}
						 });
					}else{
			
						$.each(result.play_url, function(i, item) {
							
						var programVideoId=item.programVideoId;
           
						
						//新数据	
					if(i==0){
						
					    setProgram(n,programVideoId,programid,playlist);
					
						}
						 });
			
					}
					   
				   }
			 })
		 }
	///
	 $('#topfenxiang').mousedown(function(){
	  $(this).find('ul').slideDown();
	  });
	  $('#topfenxiang').mouseleave(function(){
	  $(this).find('ul').slideUp("fast");
	  });

//
	$(document).ready(function(e) {			
	t = $('.fixed').offset().top;
	mh = $('body').height();	
	fh = $('.fixed').height();	
	$(window).scroll(function(e){
		s = $(document).scrollTop();
		$('.fixed').addClass('fixed_bg');	
		if(s > t - 0){
			$('.fixed').css('position','fixed');
			if(s + fh > mh){
				$('.fixed').css('top',mh-s-fh+'px');				
			}				
		}else{
			
			$('.fixed').css('position','');	
			$('.fixed').removeClass('fixed_bg');			
		}
	})
});

 function postTqq() {
	   var contentid = $('#topcid').val();
	   if($('#programNameDiv').html()!=""){
		var _t = encodeURI($('#programNameDiv').html());
		if(contentid!=""){
		var _url = encodeURI(cisURL+"/index.php?option=com_content&id="+contentid);
		}else{
			var _url = encodeURI(document.location);
			}
		var _u = 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' + _url + '&appkey=801510891&title=' + _t + '&pic=&line1=';
		
		window.open(_u);
		}else{ return false}
	}
  function postTsina() {

	    var contentid = $('#topcid').val();
		
		if($('#programNameDiv').html()!=""){
		var _t = encodeURI($('#programNameDiv').html());
		if(contentid!=""){
		var _url = encodeURI(cisURL+"/index.php?option=com_content&id="+contentid);
		}else{
			var _url = encodeURI(document.location);
			}
		var _u = 'http://service.weibo.com/share/share.php?url=' + _url + '&title=' + _t + '&type=icon&ralateUid=3290708473&language=zh_cn&appkey=5S4E1g&searchPic=true&style=simple';
		
	
		window.open(_u);
		}else{ return false}
	}
