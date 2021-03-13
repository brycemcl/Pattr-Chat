/* helper function that will retrieve only messages from the server where the
 * https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value */
export function messagesForClickedUser (userid) {
  /* this will eventually be replaced by an axios call to make a requets to our server and return
   * fake data mocked from our server which will emulate each message when amy is clicked in sidebar */
  const messages = [
    {
      senderId: 1,
      date: new Date('Sat Mar 13 2021 09:41:29 GMT-0800 (Pacific Standard Time)'),
      name: 'bob',
      text: 'Hmm, not sure if I like cats'
    },
    {
      senderId: 1,
      date: new Date('Sat Mar 13 2021 09:44:10 GMT-0800 (Pacific Standard Time)'),
      name: 'bob',
      text: 'I love cars'
    },
    {
      senderId: 2,
      date: new Date('Sat Mar 13 2021 09:48:11 GMT-0800 (Pacific Standard Time)'),
      name: 'Amy',
      text: 'hey there! how was your day?'
    }
  ]

  // do tha filter - tempoary method
  const filteredMessagesArr = messages.filter(obj => {
    if (obj.senderId === userid) {
      return obj
    }

    return null
  })

  return filteredMessagesArr
};

// helper function that will retrieve all of the users in a company for the current logged in user
export function showUsersInCompany () {
  /* this will eventually be replaced by an axios call to make a requets to our server and return
  * fake data mocked from our server which will emulate each companyUsers when amy is clicked in sidebar */
  const companyUsers = [
    {
      senderId: 1,
      name: 'Amy'
    },
    {
      senderId: 2,
      name: 'peter'
    },
    {
      senderId: 3,
      name: 'bob'
    }
  ]

  return companyUsers
};

// helper function that will retrieve all of the channels in a company for the current logged in user
export function showChannelsInCompany () {
  /* this will eventually be replaced by an axios call to make a requets to our server and return
  * fake data mocked from our server which will emulate each companyChannels when amy is clicked in sidebar */
  const companyChannels = [
    {
      channelId: 1,
      name: 'General'
    },
    {
      channelId: 2,
      name: 'Memes'
    },
    {
      channelId: 3,
      name: 'Warzone'
    }
  ]

  return companyChannels
};
