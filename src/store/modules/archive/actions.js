export default {
  loadAllArchivedContacts(context) {
    const responseData =
      JSON.parse(localStorage.getItem("archivedContacts")) || [];
    const contacts = [];
    for (let key in responseData) {
      const contact = {
        id: responseData[key].id,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        email: responseData[key].email,
        phone: responseData[key].phone,
        position: responseData[key].position,
        selectedCity: responseData[key].selectedCity,
        birthDate: responseData[key].birthDate,
        additionalInformation: responseData[key].additionalInformation,
        archivedDate: responseData[key].archivedDate,
      };
      contacts.push(contact);
    }
    context.commit("allArchivedContacts", contacts);
  },

  restoreContact(context, payload) {
    const responseData = JSON.parse(localStorage.getItem("archivedContacts"));
    const contactId = responseData.findIndex(
      (contact) => contact.id === payload
    );
    const restoredContact = responseData[contactId];
    delete restoredContact.archivedDate;

    responseData.splice(contactId, 1);
    const archivedContacts = JSON.stringify(responseData);
    localStorage.setItem("archivedContacts", archivedContacts);

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(restoredContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    context.commit("allArchivedContacts", responseData);
    context.commit("setMessage", "Contact restored successfuly!");
    setTimeout(() => {
      context.commit("clearMessage");
    }, 5000);
  },
};
