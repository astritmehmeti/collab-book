export default {
  newContact(context, payload) {
    const contactDetails = JSON.parse(localStorage.getItem("contacts")) || [];
    const contactData = {
      id: new Date().toISOString().slice(-4),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      position: payload.position,
      selectedCity: payload.selectedCity,
      birthDate: payload.birthDate,
      additionalInformation: payload.additionalInformation,
    };
    contactDetails.push(contactData);
    const contacts = JSON.stringify(contactDetails);
    localStorage.setItem("contacts", contacts);
    context.commit("addContactToList", contactData);
    context.commit("setMessage", "Contact added successfuly!");
    setTimeout(() => {
      context.commit("clearMessage");
    }, 5000);
  },

  loadAllContacts(context) {
    const responseData = JSON.parse(localStorage.getItem("contacts")) || [];
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
      };
      contacts.push(contact);
    }
    context.commit("allContacts", contacts);
  },

  editContact(context, payload) {
    const responseData = JSON.parse(localStorage.getItem("contacts")) || [];
    const contactId = responseData.findIndex(
      (contact) => contact.id === payload.id
    );
    responseData[contactId] = payload;
    localStorage.setItem("contacts", JSON.stringify(responseData));
    context.commit("allContacts", responseData);
    context.commit("setMessage", "Contact updated successfuly!");
    setTimeout(() => {
      context.commit("clearMessage");
    }, 5000);
    throw new Error("Duke e simuluar nje gabim ne rrjete apo gjetiu...");
  },

  deleteContact(context, payload) {
    const responseData = JSON.parse(localStorage.getItem("contacts")) || [];
    const contactId = responseData.findIndex(
      (contact) => contact.id === payload
    );
    const deletedContact = responseData[contactId];
    responseData.splice(contactId, 1);
    const contacts = JSON.stringify(responseData);
    localStorage.setItem("contacts", contacts);
    const archivedContacts =
      JSON.parse(localStorage.getItem("archivedContacts")) || [];
    const archivedContact = {
      ...deletedContact,
      archivedDate: new Date().toISOString().split("T")[0],
    };
    archivedContacts.push(archivedContact);
    localStorage.setItem("archivedContacts", JSON.stringify(archivedContacts));
    context.commit("allContacts", responseData);
    context.commit("setMessage", "Contact deleted successfuly!");
    setTimeout(() => {
      context.commit("clearMessage");
    }, 5000);
  },
};
