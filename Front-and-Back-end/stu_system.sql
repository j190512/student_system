/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : stu_system

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 09/12/2019 17:50:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass` int(255) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', 123456);

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` int(255) NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (10000, '看看你', 1, 1, '英语', '1');
INSERT INTO `students` VALUES (10001, '安抚', 1, 1, '带娃', '1');
INSERT INTO `students` VALUES (10002, '第二', 0, 20, 'da', '1');
INSERT INTO `students` VALUES (10003, '第三', 1, 3, '英语', '1');
INSERT INTO `students` VALUES (10004, '单位大', 1, 1, '语文', '1');
INSERT INTO `students` VALUES (10005, '第五', 0, 1, '语文', '1');
INSERT INTO `students` VALUES (10006, '第六', 0, 1, '语文', '1');
INSERT INTO `students` VALUES (10007, '郝美', 0, 20, '语文', '3');
INSERT INTO `students` VALUES (10011, '王虎', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10012, '我的', 0, 19, '语文', '1');
INSERT INTO `students` VALUES (10013, '数据', 0, 20, '英语', '1');
INSERT INTO `students` VALUES (10014, '王虎', 1, 20, '数学', '1');
INSERT INTO `students` VALUES (10016, '单位', 0, 22, '数学', '1');
INSERT INTO `students` VALUES (10017, '王虎', 0, 20, '数学', '2');
INSERT INTO `students` VALUES (10018, '王虎', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10019, '大人物恶女', 1, 20, '英语', '2');
INSERT INTO `students` VALUES (10020, '王虎', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10021, '会同', 1, 17, '英语', '3');
INSERT INTO `students` VALUES (10022, '王虎', 1, 20, '语文', '3');
INSERT INTO `students` VALUES (10023, '㔿东方', 0, 20, '英语', '1');
INSERT INTO `students` VALUES (10024, '王虎', 1, 16, '语文', '1');
INSERT INTO `students` VALUES (10025, '王虎', 0, 20, '英语', '1');
INSERT INTO `students` VALUES (10026, '王虎', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10027, '王虎', 0, 20, '语文', '1');
INSERT INTO `students` VALUES (10028, '单位', 0, 20, '数学', '3');
INSERT INTO `students` VALUES (10029, '王虎', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10030, '单位', 1, 22, '数学', '3');
INSERT INTO `students` VALUES (10031, '反而', 1, 20, '语文', '1');
INSERT INTO `students` VALUES (10032, '王虎', 0, 20, '英语', '2');
INSERT INTO `students` VALUES (10033, '他人', 1, 21, '数学', '1');
INSERT INTO `students` VALUES (10034, '理论', 0, 20, '英语', '2');

SET FOREIGN_KEY_CHECKS = 1;
