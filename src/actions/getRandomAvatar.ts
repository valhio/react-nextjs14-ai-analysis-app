const gradients = [
    "from-cyan-500 to-blue-500",
    "from-fuchsia-500 to-purple-500",
    "from-rose-500 to-pink-500",
    "from-orange-500 to-amber-500",
    "from-green-500 to-lime-500",
    "from-teal-500 to-cyan-500",
    "from-purple-500 to-rose-500",
    "from-pink-500 to-fuchsia-500",
    "from-amber-500 to-orange-500",
    "from-lime-500 to-green-500",
    "from-cyan-500 to-teal-500",
    "from-rose-500 to-purple-500",
    "from-fuchsia-500 to-pink-500",
    "from-violet-600 to-indigo-600",
    "from-amber-200 to-yellow-400",
    "from-indigo-500 to-blue-500",
    "from-blue-600 to-violet-600",
    "from-neutral-300 to-stone-400",
    "from-red-500 to-orange-500",
    "from-stone-500 to-stone-700",
    "from-violet-200 to-pink-200",
    "from-blue-700 to-indigo-900",
    "from-fuchsia-600 to-purple-600",
    "from-blue-200 to-cyan-200",
    "from-teal-200 to-teal-500",
    "from-fuchsia-600 to-pink-600",
    "from-pink-500 to-rose-500",
    "from-fuchsia-500 via-pink-500 to-rose-500",

];

export function getRandomGradient() {
    return gradients[Math.floor(Math.random() * gradients.length)];
};

const gradientDirection = [
    "bg-gradient-to-r",
    "bg-gradient-to-l",
    "bg-gradient-to-t",
    "bg-gradient-to-b",
    "bg-gradient-to-tr",
    "bg-gradient-to-tl",
    "bg-gradient-to-br",
    "bg-gradient-to-bl"
];

export function getRandomGradientDirection() {
    return gradientDirection[Math.floor(Math.random() * gradientDirection.length)];
};
