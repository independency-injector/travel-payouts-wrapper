
module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('ticket', {
        origin_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        depart_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        airline_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flight_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return Model;
}