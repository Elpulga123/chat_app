const users = [];
const addUser = ({id, name, room}) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // hàm find, tìm kiếm trong mảng.
    const existingUser = users.find((user) => {
        user.room === room && user.name === name;
    });

    if(existingUser){
        return {error : 'User is taken'}
    }

    const user = {id, name, room};
    users.push(user);

    return {user};
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== 1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

// lọc tất cả các user cùng phòng vào 1 nhóm.
const getUserInRoom = (room) => users.filter((user) => user.room === room);

export {addUser, removeUser, getUser, getUserInRoom};

