const notifyList = [];
const editList = [];

const MockMailer = {
  notifyList: notifyList,
  editList: editList,
  notify: (mailData) => {
    notifyList.push(mailData);
    return Promise.resolve();
  },
  editSubscription: (mailData) => {
    editList.push(mailData);
    return Promise.resolve();
  },
};

module.exports = MockMailer;
