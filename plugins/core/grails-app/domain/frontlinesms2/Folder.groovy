package frontlinesms2

class Folder extends MessageOwner {
	static transients = ['liveMessageCount']
	String name
	Date dateCreated
	
	static constraints = {
		name(blank:false, nullable:false, maxSize:255)
	}
	
	def getFolderMessages(getOnlyStarred=false, getSent=true) {
		Fmessage.owned(this, getOnlyStarred, getSent)
	}
	
	def archive() {
		this.archived = true
		def messagesToArchive = Fmessage.owned(this, false, true)?.list()
		messagesToArchive.each { it?.archived = true }
	}
	
	def unarchive() {
		this.archived = false
		def messagesToArchive = Fmessage?.owned(this, false, true)?.list()
		messagesToArchive.each { it?.archived = false }
	}
	
	def getLiveMessageCount() {
		def m = Fmessage.findAllByMessageOwnerAndIsDeleted(this, false)
		m ? m.size() : 0
	}
	
	def getType() {
		return 'folder'
	}
}
