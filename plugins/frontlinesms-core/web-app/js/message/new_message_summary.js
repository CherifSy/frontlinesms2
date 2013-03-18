new_message_summary = (function() {
	var
	newMessageSummaryResponseHandler = function(data) {
		data = data.new_message_summary;
		updateSpan($("li[entitytype='inbox'] a"), data.inbox[0]);
		$.each(data.activities, function(activityId, unreadMessageCount) {
			updateSpan($("li[entitytype='activity'][entityid='" + activityId + "'] a"), unreadMessageCount);
		});
		$.each(data.folders, function(folderId, unreadMessageCount) {
			updateSpan($("li[entitytype='folder'][entityid='" + folderId + "'] a"), unreadMessageCount);
		});
	},
	updateSpan = function(anchorSelecter, value) {
		var existingSpan = $(anchorSelecter).find("span.unread_message_count");
		var previousValue = 0;
		if($(existingSpan).length) {
			previousValue = $(existingSpan).text();
			$(existingSpan).text(value);
		}
		else {
			$(anchorSelecter).append("<span class='unread_message_count'>"+value+"</span>");
			existingSpan = $(anchorSelecter).find("span.unread_message_count");
		}
		if(value == 0) {
			$(existingSpan).addClass("zero");	
		}
		else {
			$(existingSpan).removeClass("zero");	
			if(value > previousValue) {
				$(existingSpan).pulse({
					backgroundColor : '#C03283',
					color           : 'white'
				},
				{
					returnDelay : 300,
					interval    : 400,
					pulses      : 1
				});
			}
		}
	},
	init = function() {
		app_info.listen("new_message_summary", newMessageSummaryResponseHandler);
	};

	return { init:init };
}());

$(function() {
	new_message_summary.init();
});


