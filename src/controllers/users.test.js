const User = require('../models/user');
const user = require('../controllers/users');
const { getToken } = require('../utils/auth')
jest.mock('../models/user');
jest.mock('../utils/auth');

describe('getAll', () => {
    let req
    let res
  
    beforeEach(() => {
      req = {}
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      }
    })
  
    it('should return all users', async () => {
      User.find.mockResolvedValue([{ name: 'John Doe' }])
      await user.getAll(req, res)
      expect(User.find).toHaveBeenCalledWith({})
      expect(res.json).toHaveBeenCalledWith([{ name: 'John Doe' }])
    })
  
    it('should return error if there is a problem finding users', async () => {
      const errorMessage = 'Error finding users'
      User.find.mockRejectedValue({ message: errorMessage })
      await user.getAll(req, res)
      expect(User.find).toHaveBeenCalledWith({})
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.status().json).toHaveBeenCalledWith({ message: errorMessage })
    })
  })

describe('getOne', () => {
    it('should return a user', async () => {
        User.findById.mockResolvedValue({ name: 'John Doe' });
        const req = {
            params: {
                _id: '123'
            }
        };
        const res = {
            json: jest.fn()
        };
        await user.getOne(req, res);
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' });
    });

    it('should return a 500 error', async () => {
        User.findById.mockRejectedValue(new Error('Error finding user'));
        const req = {
            params: {
                _id: '123'
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() })
        };
        await user.getOne(req, res);
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status().json).toHaveBeenCalledWith({ message: 'Error finding user' });
    });
});

describe('auth', () => {
    it('should return a token if credentials are correct', async () => {
        User.findOne.mockResolvedValue({
            _id: '123',
            username: 'johndoe',
            roles: ['admin'],
            phone: '+1234567890'
        });
        getToken.mockReturnValue('1234567890'); 
    })
});
