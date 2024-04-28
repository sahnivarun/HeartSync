const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Sequelize setup
// const sequelize = new Sequelize('dating_application', '', '', {
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
// });
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/niharchauhan/Documents/HeartSync/users.db' // Path to your SQLite database file
});

// Define models
// const User = sequelize.define('User', {
//   name: DataTypes.STRING,
//   avatar: DataTypes.STRING,
//   bio: DataTypes.TEXT
// });

// Define models
const Users = sequelize.define('users', {
  name: DataTypes.STRING,
  essay0: DataTypes.TEXT,
  age: DataTypes.INTEGER,
  status: DataTypes.STRING,
  sex: DataTypes.STRING,
  orientation: DataTypes.STRING,
  location: DataTypes.STRING,
  body_type: DataTypes.STRING,
  height: DataTypes.STRING,
  diet: DataTypes.STRING,
  drinks: DataTypes.STRING,
  drugs: DataTypes.STRING,
  smokes: DataTypes.STRING,
  education: DataTypes.STRING,
  job: DataTypes.STRING,
  ethnicity: DataTypes.STRING,
  religion: DataTypes.STRING,
  offspring: DataTypes.STRING,
  pets: DataTypes.STRING,
  speaks: DataTypes.STRING,
  sign: DataTypes.STRING,
  username: DataTypes.TEXT,
  password: DataTypes.TEXT
});

const Like = sequelize.define('Like', {
  liked: DataTypes.BOOLEAN
});

const Match = sequelize.define('Match', {
  totalMatches: DataTypes.INTEGER
});

// Define associations
Users.belongsToMany(Users, { through: Like, as: 'Liker', foreignKey: 'username' });
Users.belongsToMany(Users, { through: Like, as: 'Liked', foreignKey: 'likedUsername' });

app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Users.findAll({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt'] // Exclude the id column from the SELECT query
      },
      where: {
        username: {
          [Sequelize.Op.ne]: 'user84335' // Show only recommended profiles except for his/her own profile
        }
      }
    });
    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define routes
app.post('/like', async (req, res) => {
  const { username, likedUsername, liked } = req.body;
  console.log("userId ", username);
  console.log("likedUserId ", likedUsername);
  console.log("liked ", liked);
  try {
    await Like.create({ username, likedUsername, liked });
    // await User.destroy({ where: { id: likedUserId } });
    res.status(200).json({ message: 'Like saved successfully' });
  } catch (error) {
    console.error('Error saving like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/dislike', async (req, res) => {
  const { username, likedUsername, liked } = req.body;
  try {
    await Like.create({ username, likedUsername, liked });
    // await User.destroy({ where: { id: likedUserId } });
    res.status(200).json({ message: 'Dislike saved successfully' });
  } catch (error) {
    console.error('Error saving dislike:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/match/:likedUsername', async (req, res) => {
  // const likedUserId = likedUserId;
  // console.log("likedUserId ", likedUserId);
  const likedUsername = req.params.likedUsername;
  console.log("likedUsername ", likedUsername);

  try {
    // Check if there's a mutual like between the operating user and the liked user
    const mutualLike = await Like.findOne({
      where: {
        username: likedUsername, // Operating user's ID
        likedUsername: 'user84335' // Assuming you have authentication middleware that sets req.user
      }
    });

    console.log("mutualLike ", mutualLike);

    if (mutualLike) {
      res.status(200).json({ match: true });
    } else {
      res.status(200).json({ match: false });
    }
  } catch (error) {
    console.error('Error checking for match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error syncing database:', error));
