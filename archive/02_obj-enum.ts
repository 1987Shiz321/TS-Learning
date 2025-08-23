enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
}

const person = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

// person.role = [0, 'admin']; // Tuple type can be reassigned

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby);
}

if (person.role === Role.ADMIN) {
    console.log('管理者です');
} else if (person.role === Role.READ_ONLY) {
    console.log('読み取り専用です');
}