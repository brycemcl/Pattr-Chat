/* helper function that will retrieve only messages from the server where the
 * https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value */
export function messagesForClickedUser (userid) {
  /* this will eventually be replaced by an axios call to make a requets to our server and return
   * fake data mocked from our server which will emulate each message when amy is clicked in sidebar */
  const messages = [
    {
      sender_id: 1,
      name: 'bob',
      text: 'Hmm, not sure if I like cats'
    },
    {
      sender_id: 1,
      name: 'bob',
      text: 'I love cars'
    },
    {
      sender_id: 2,
      name: 'Amy',
      text: 'hey there! how was your day?'
    }
  ]

  // do tha filter - tempoary method
  const filteredMessagesArr = messages.filter(obj => {
    if (obj.sender_id === userid) {
      return obj
    };

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
      sender_id: 1,
      name: 'Amy'
    },
    {
      sender_id: 2,
      name: 'peter'
    },
    {
      sender_id: 3,
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
      channel_id: 1,
      name: 'General'
    },
    {
      channel_id: 2,
      name: 'Memes'
    },
    {
      channel_id: 3,
      name: 'Warzone'
    }
  ]

  return companyChannels
};
