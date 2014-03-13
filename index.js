/*global module */
/*
 * Module for handling stream connections by a UID
 */

module.exports = function () {


    var self = {}
      , StreamBank = {}


    function addStream (stream, ID) {

        if (!(ID in StreamBank)) {
            StreamBank[ID] = {}
            StreamBank[ID].streams = []
        }

        StreamBank[ID].streams.push(stream)

        return StreamBank[ID].streams.length

    }


    function removeStream (stream, ID) {

        if (!(ID in StreamBank)) return -1
        var ix  = StreamBank[ID].streams.indexOf(stream)
        if (ix < 0) return -1
        StreamBank[ID].streams.splice(ix, 1)

        if (StreamBank[ID].streams.length === 0) {
            delete StreamBank[ID]
            return 0
        }

        return StreamBank[ID].streams.length
    }



    function forEachStream (ID, cb) {

        if (!(ID in StreamBank)) return false

        StreamBank[ID].streams.forEach(cb)

        return true
    }

    function countStreamsByID (ID) {
        var ConnCount = {}
        if (!ID) {
            for (ID in StreamBank) {
                ConnCount[ID] = StreamBank[ID].streams.length
            }
            return ConnCount;
        }
        else {
            if (!(ID in StreamBank)) {
                return 0
            }
            else {
                return StreamBank[ID].streams.length
            }
        }
    }

    function countStreamsForID (ID) {

    }

    self.addStream = addStream
    self.removeStream = removeStream
    self.forEachStream = forEachStream
    self.countStreamsByID = countStreamsByID

    return self
}