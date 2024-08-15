import React from 'react';

type CardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
    bgIconColor: string;
    iconColor: string;
    textColor: string;
    bgColor: string;
};

const Card: React.FC<CardProps> = ({ title, value, icon, bgIconColor, iconColor, textColor, bgColor }) => {
    return (
        <div className={`${bgColor} shadow-lg rounded-xl p-4 flex items-center`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgIconColor}`}>
                <div className={`${iconColor}`}>{icon}</div>
            </div>
            <div className="ml-4">
                <p className={`${textColor}`}>{title}</p>
                <p className={`text-xl font-bold ${textColor}`}>{value}</p>
            </div>
        </div>
    );
};

export default Card;
