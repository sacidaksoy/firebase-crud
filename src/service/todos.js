import { UtilityFunctions } from "../utils";

/**
 * Asynchronously fetch data from the mock backend
 * @param {string} query
 * @returns {array || undefined}
 */

export const getTodosFirebase = () => {

    const todoRequest = UtilityFunctions.getTodosFirebase();

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const createTodosFirebase = (newName, newAge) => {

    const todoRequest = UtilityFunctions.createTodosFirebase(newName, newAge);

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const updateTodosFirebase = (id, name) => {

    const todoRequest = UtilityFunctions.updateTodosFirebase(id, name);

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const deleteTodosFirebase = (id) => {

    const todoRequest = UtilityFunctions.deleteTodosFirebase(id);

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};


