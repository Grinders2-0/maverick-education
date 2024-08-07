import CollegeInfoModel from '../../models/registration/collegeInfo.js';

export const checkUserExist = async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const collegeInfo = await CollegeInfoModel.findOne({ userId });

    if (collegeInfo) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (dbError) {
    console.error('Database error:', dbError);
    return res.status(500).json({ error: 'Database error' });
  }
};
