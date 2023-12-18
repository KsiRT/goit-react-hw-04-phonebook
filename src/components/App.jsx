import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';
import { ContactList } from './Contactlist/ContactList';
import { styled } from 'styled-components';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts?.length) {
      return parsedContacts;
    }
    return [];
  });

  const [filter, setFilter] = useState('');

  // Принимаем фильтр из инпута
  const handleFilterInput = value => {
    setFilter(value);
  };

  const addNewContact = newContact => {
    const checkContact = contacts.find(
      contact =>
        contact.fullName.toLowerCase() === newContact.fullName.toLowerCase()
    );
    checkContact
      ? Notiflix.Notify.failure(`${newContact.fullName} is already in contacts`)
      : setContacts(prev => [...prev, newContact]);
  };
  // Фильтруем
  const getFilteredContact = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.fullName.toLowerCase().includes(filter.toLowerCase())
    );
  };
  // Удаляем контакт
  const handleDelete = (id, fullName) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

    Notiflix.Notify.success(
      `${fullName} was successfully deleted from your Phonebook`
    );
  };

  // componentDidMount() логіка перенесена в useState

  // componentDidUpdate
  //  Записываем контакты из состояния в локал сторедж
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContact = getFilteredContact(filter);
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContact={addNewContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterInput={handleFilterInput} />
      <ContactList contacts={filteredContact} onDelete={handleDelete} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #82adba;
  height: 100vh;
`;
