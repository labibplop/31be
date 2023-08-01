const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class UserController {
  // labib
  static async createUser(req, res) {
    const { username, password, email, total_score, biodata, city } = req.body;
    try {
      const hashPw = await bcrypt.hash(password, 12);
      const parsedTotalScore = parseInt(total_score);
      const player = await prisma.user.create({
        data: {
          username,
          password: hashPw,
          email,
          total_score: parsedTotalScore,
          biodata,
          city,
        },
      });
      //jika body tidak di isi
      if (!email || !username) {
        return res.status(404).json({
          result: "Failed",
          messege: "username atau password harus di isi",
        });
      }
      if (!password) {
        return res.status(404).json({
          result: "Failed",
          messege: "Password harus di isi",
        });
      }
      res.status(200).json({
        message: "berhasil membuat data user",
        data: player,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({msg:error.message});
    }
  }

  // mas laksman
  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();

      if (!users) {
        return res.status(400).json({
          result: "Failed",
          message: "Tidak ada data",
        });
      }
      res.status(200).json({
        result: "Success get users",
        payload: users,
      });
    } catch (error) {
      res.status(500).json({msg:error.message});
    }
  }

  // auda
  static async getUserById(req, res) {
    try {
      const {id} = req.params;
      const players = await prisma.user.findUnique({where:{id}})
      
      if(!players) return res.status(400).json({
        result:"user not found"
      })
      res.status(200).json({message:`succes get player by id ${id}`, data: players})
    } catch (error) {
      res.status(500).json({msg:error.message});
    }
  }

  //micho
  static async updateUser(req, res) {
    const { id } = req.params; // Mendapatkan ID user dari URL parameter
    const { username, password, email, total_score, biodata, city } = req.body;
    try {
      // Cek apakah user sama dengan ID yang diberikan ada di database
      const User = await prisma.user.findUnique({
        where: { id },
      });

      if (!User) {
        return res.status(404).json({
          result: "Failed",
          message: "User tidak ditemukan",
        });
      }

      // Update data user dengan value baru
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username: username || User.username,
          password: password ? await bcrypt.hash(password, 12) : User.password,
          email: email || User.email,
          total_score: total_score ? parseInt(total_score) : User.total_score,
          biodata: biodata || User.biodata,
          city: city || User.city,
        },
      });

      res.status(200).json({
        message: `Success update users with id ${id}`,
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        result: "Failed",
        message: "Ada kesalahan saat memperbarui data",
      });
    }
  }

  // delete
  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      // delete data user
      const deleteUser = await prisma.user.delete({
        where: { id },
      });

      res.status(200).json({
        message: " User deleted",
        data: deleteUser,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
