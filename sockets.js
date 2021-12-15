function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, isCorrect: d.isCorrect, questionNumber: d.questionNumber});
    socket.emit('questionAdded', data.getPoll(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  //For seeing which question in poll we're checking in Poll view
  let i = 0;
  //TODO: Check if it is last question in poll
  socket.on('getNextQ', function(d) {
    var thisPoll = data.getPoll(d.pollId);
    var thisPollLength = thisPoll.questions.length;
    if (eval(i) + eval(1) < thisPollLength){
      try{
        i += 1;
        socket.emit('newQuestion', data.getQuestion(d.pollId, i));
      }
      catch(err){
        console.log("Next question error");
      }
    }
    else{
      //LINK TO RESULTS page (button perhaps, change text of "next question?")
      console.log("Here we show redirecting to results");
    }

  });

  socket.on('getPrevQ', function(d) {
    console.log("attempting prevving");
    if(i>0){
      i -= 1;
      socket.emit('newQuestion', data.getQuestion(d.pollId, i));
      console.log("prevved");
    }
  });


  socket.on('showResults', function(d) {
    socket.emit('sendPoll', data.getPoll(d))
  });
}

module.exports = sockets;
