# import json

# board_list = [["F","F","F","F","F"],["F","D","F","F","F"],["F","F","F","F","F"],["F","F","F","F","F"]]
#
# # print(board_list)
# print(json.dumps(board_list))

# import json
# from random import shuffle
# from copy import deepcopy
# import sys
# import numpy as np
#
# class CatanBoard:
#     def __init__(self, board):
#         self.board = board
#         self.width = len(board[0])
#         self.height = len(board)
#
#     def get_hex(self, loc):
#         '''
#         Gets the Hex object at tuple index.
#         '''
#         return self.board[loc[0]][loc[1]]
#
#     def get_num(self, loc):
#         '''
#         Returns number at location.
#         '''
#         num_map = {0:'-', 10:'A', 11:'B', 12:'C'}
#
#         return num_map.get(self.board[loc[0]][loc[1]].number, self.board[loc[0]][loc[1]].number)
#
#     def update_hex(self, hex, loc):
#         '''
#         Updates the Hex object at tuple index.
#         '''
#         try:
#             self.board[loc[0]][loc[1]] = hex
#         except IndexError:
#             print("Index error: " + str(loc))
#
#     def swap_hex(self, row1, col1, row2, col2):
#         '''
#         Swaps the hexes at two index locations.
#         '''
#         self.board[row1][col1].row, self.board[row2][col2].row = self.board[row2][col2].row, self.board[row1][col1].row
#         self.board[row1][col1].col, self.board[row2][col2].col = self.board[row2][col2].col, self.board[row1][col1].col
#         self.board[row1][col1].compute_neighbors()
#         self.board[row2][col2].compute_neighbors()
#         self.board[row1][col1], self.board[row2][col2] = self.board[row2][col2], self.board[row1][col1]
#
#     def swap_number(self, row1, col1, row2, col2):
#         '''
#         Swaps the numbers at two index locations.
#         '''
#         self.board[row1][col1].number, self.board[row2][col2].number = self.board[row2][col2].number, self.board[row1][col1].number
#
#     def check_swap(self, row1, col1, row2, col2, numbers=False):
#         '''
#         Checks if a hex swap will result in identical adjacent hexes.
#         '''
#         if numbers:
#             for loc in self.board[row1][col1].neighbors:
#                 if self.board[row1][col1].number == self.get_hex(loc).number:
#                     return False
#
#             for loc in self.board[row2][col2].neighbors:
#                 if self.board[row2][col2].number == self.get_hex(loc).number:
#                     return False
#         else:
#             for loc in self.board[row1][col1].neighbors:
#                 if self.board[row1][col1].name == self.get_hex(loc).name:
#                     return False
#
#             for loc in self.board[row2][col2].neighbors:
#                 if self.board[row2][col2].name == self.get_hex(loc).name:
#                     return False
#         return True
#
#     def hex_adj_score(self):
#         '''
#         Computes score for adjacency of identical hex tiles.
#         '''
#         tally = 0
#         for row in range(self.height):
#             for col in range(self.width):
#                 for loc in self.board[row][col].neighbors:
#                     if self.in_board(loc) and self.board[row][col].name != "sea" and self.board[row][col].name == self.get_hex(loc).name:
#                         tally += 1
#         return tally
#
#     def adjusted_location(self, row, col):
#         if row % 2 == 0:
#             return row, col + 0.5
#         return row, col
#
#     def land_center(self, mask=None):
#         if not mask:
#             mask = {'sea', 'desert'}
#
#         row_total = 0
#         col_total = 0
#         hex_count = 0
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name not in mask:
#                     row_total += self.adjusted_location(row,col)[0]
#                     col_total += self.adjusted_location(row,col)[1]
#                     hex_count += 1
#
#         return (row_total / hex_count, col_total / hex_count)
#
#     def resource_score(self):
#         '''
#         Computes score for general resource distribution.
#         Dev Var Pts
#         H   H   0
#         H   L   -2
#         L   H   +2
#         L   L   -1
#         '''
#         center = self.land_center(mask={'sea'})
#
#         tally = {'hill':0,
#                  'pasture':0,
#                  'mountain':0,
#                  'field':0,
#                  'forest':0}
#         hex_locs = {'hill':[],
#                     'pasture':[],
#                     'mountain':[],
#                     'field':[],
#                     'forest':[]}
#
#         # Add each hex to dicitonary of hex indexes
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name in tally:
#                     hex_locs[self.board[row][col].name].append(np.array(self.adjusted_location(row, col)))
#
#         def clamp(val):
#             if val < 0.4:
#                 return 0.4
#             elif val > 3:
#                 return 3
#             return val
#
#         def squared_distance(p1, p2):
#             return (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2
#
#         for hex in hex_locs:
#             # Local center of each resource type
#             resource_center = np.average(np.array(hex_locs[hex]), axis=0)
#             # Variance of distance from local center (Average of squared distances from local center)
#             resource_variance = np.average(np.array([(resource_center[0]-hex_loc[0])**2 + (resource_center[1]-hex_loc[1])**2 for hex_loc in hex_locs[hex]]))
#             # Squared distance between resource center and land center
#             resource_deviation = squared_distance(resource_center, center)
#
#             # Computes score
#             # print(hex, "deviation", resource_deviation)
#             # print(hex, "variance", resource_variance)
#             tally[hex] = 1/clamp(resource_deviation) * clamp(resource_variance)
#             # print(hex, "score", tally[hex])
#
#         return sum(tally.values())/len(tally)
#
#     def numbers_adj_score(self):
#         '''
#         Computes score for adjacency of identical number chips.
#         '''
#         tally = 0
#         for row in range(self.height):
#             for col in range(self.width):
#                 for loc in self.board[row][col].neighbors:
#                     if self.in_board(loc) and self.board[row][col].name not in {'sea','desert'} and self.board[row][col].number == self.get_hex(loc).number:
#                         tally += 1
#         return tally
#
#     def redundency_score(self):
#         '''
#         Computes score for idential numbers on idential resources.
#         '''
#         tally = 0
#         resource_numbers = {'hill':set(),
#                             'pasture':set(),
#                             'mountain':set(),
#                             'field':set(),
#                             'forest':set()}
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name in resource_numbers:
#                     if self.board[row][col].number in resource_numbers[self.board[row][col].name]:
#                         tally += 1
#                     else:
#                         resource_numbers[self.board[row][col].name].add(self.board[row][col].number)
#
#         # Two or more redundencies results in lowest score
#         return max(0, -tally**2 + 4)
#
#
#     def value_score(self):
#         '''
#         Computes equivalent strengths in resource numbers.
#         '''
#         tally = {'hill':[],
#                  'pasture':[],
#                  'mountain':[],
#                  'field':[],
#                  'forest':[]}
#         value = {2:1, 3:2, 4:3, 5:4, 6:5, 8:5, 9:4, 10:3, 11:2, 12:1}
#
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name in tally:
#                     tally[self.board[row][col].name].append(value[self.board[row][col].number])
#
#         # Min of average values
#         return min([sum(vals)/len(vals) for vals in tally.values()])
#
#     def numbers_score(self):
#         '''
#         Computes score for general distribution of numbers by strengths.
#         Dev Var Pts
#         H   H   0
#         H   L   -2
#         L   H   +2
#         L   L   -1
#         '''
#
#         center = self.land_center(mask={'sea'})
#
#         tally = {'great':0,
#                  'high':0,
#                  'med':0,
#                  'low':0}
#         num_locs = {'great':[],
#                     'high':[],
#                     'med':[],
#                     'low':[]}
#         category = {2:'low',
#                     3:'low',
#                     4:'med',
#                     5:'high',
#                     6:'great',
#                     8:'great',
#                     9:'high',
#                     10:'med',
#                     11:'low',
#                     12:'low'}
#
#         # Add each hex to dicitonary of hex indexes
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].number in category:
#                     num_locs[category[self.board[row][col].number]].append(np.array(self.adjusted_location(row, col)))
#
#         def clamp(val):
#             if val < 0.4:
#                 return 0.4
#             elif val > 3:
#                 return 3
#             return val
#
#         def squared_distance(p1, p2):
#             return (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2
#
#         for cat in num_locs:
#             cat_center = np.average(np.array(num_locs[cat]), axis=0)
#             # Variance of distance from local center (Average of squared distances from local center)
#             cat_variance = np.average(np.array([(cat_center[0]-num_loc[0])**2 + (cat_center[1]-num_loc[1])**2 for num_loc in num_locs[cat]]))
#             # Squared distance between resource center and land center
#             cat_deviation = squared_distance(cat_center, center)
#
#             tally[cat] = 1/clamp(cat_deviation) * clamp(cat_variance)
#
#         return sum(tally.values())/len(tally)
#
#     def variety_score(self):
#         '''
#         Computes score for neighboring numbers of similar strengths.
#         '''
#         value = {0:1, 2:1, 3:2, 4:3, 5:4, 6:5, 8:5, 9:4, 10:3, 11:2, 12:1}
#         tally = 0
#         count = 0
#
#         def score(num1, num2):
#             return max(0, (value[num1]-3) * (value[num2]-3))**2
#
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name != "sea":
#                     count += 1
#                     for loc in self.board[row][col].neighbors:
#                         tally += score(self.board[row][col].number, self.board[loc[0]][loc[1]].number)
#
#         return count/tally
#
#     def adjacent_identical(self, numbers=False):
#         '''
#         Gets hexes with identical adjacent hexes.
#         '''
#         adj = []
#         if numbers:
#             for row in range(self.height):
#                 for col in range(self.width):
#                     for loc in self.board[row][col].neighbors:
#                         if self.in_board(loc) and self.board[row][col].name not in {"sea","desert"} and self.board[row][col].number == self.get_hex(loc).number:
#                             adj.append(self.board[row][col])
#         else:
#             for row in range(self.height):
#                 for col in range(self.width):
#                     for loc in self.board[row][col].neighbors:
#                         if self.in_board(loc) and self.board[row][col].name != "sea" and self.board[row][col].name == self.get_hex(loc).name:
#                             adj.append(self.board[row][col])
#         return adj
#
#     def apply_numbers(self, numbers):
#         '''
#         Applies a list representation of numbers to the board.
#         '''
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name not in ('sea', 'desert'):
#                     self.board[row][col].number = numbers[row][col]
#                 else:
#                     self.board[row][col].number = 0
#
#     def in_board(self, loc):
#         return loc[0] < self.height and loc[0] >= 0 and loc[1] < self.width and loc[1] >= 0
#
#     def create_template(self, mask=None):
#         '''
#         Produces a list template representation of the board, with 'L' as land.
#         '''
#         if not mask:
#             mask = {"sea", "desert"}
#
#         template = []
#         cur_row = []
#
#         for row in range(self.height):
#             for col in range(self.width):
#                 if self.board[row][col].name in mask:
#                     cur_row.append("-")
#                 else:
#                     cur_row.append("L")
#             template.append(cur_row)
#             cur_row = []
#
#         return template
#
#     def normalized_num_score(self):
#         return 1*self.value_score()/2.3 + 2*self.numbers_score()/4.6 + 3*self.variety_score()/.1 + 2*self.redundency_score()/2.5
#
#     def create_boardlist(self):
#         boardlist = []
#         for row in range(self.height):
#             row_list = []
#             for col in range(self.width):
#                 row_list.append(self.board[row][col].string)
#             boardlist.append(row_list)
#             row_list = []
#         return boardlist
#
#     def display_details(self):
#         print('Variety Score:', self.variety_score())
#         print('Value Score:', self.value_score())
#         print('Numbers Score:', self.numbers_score())
#         print('Redundency Score:', self.redundency_score())
#         print('Normalized Score:', self.normalized_num_score())
#         print('Num Adj Score:', self.numbers_adj_score())
#         print('Hex Adj Score:', self.hex_adj_score())
#         print('Resource Score:', self.resource_score())
#
#     def display(self, numbers=False):
#         if numbers:
#             for row in range(self.height):
#                 if row % 2 == 0:
#                     print(" ", end="")
#                 for col in range(self.width):
#                     print(self.get_num((row,col)), "", end="")
#                 print("")
#         else:
#             for row in range(self.height):
#                 # Prints clean format
#                 if row % 2 == 0:
#                     print(" ", end="")
#                 for col in range(self.width):
#                     print(self.get_hex((row,col)), "", end="")
#                 print("")
#
# class Hex:
#     def __init__(self, loc):
#         self.hex_rep = {'hill':'H',
#                         'pasture':'P',
#                         'mountain':'M',
#                         'field':'W',
#                         'forest':'F',
#                         'desert':'D',
#                         'sea':'-'}
#         self.string = self.hex_rep[self.name]
#         self.row = loc[0]
#         self.col = loc[1]
#         self.loc_map = {'ne':0,'e':1,'se':2,'sw':3,'w':4,'nw':5,}
#         self.number = 0
#         self.neighbors = []
#         self.compute_neighbors()
#
#     def get_neighbor(self, neighbor):
#         '''
#         Gets neighboring hex address.
#         '''
#         return self.neighbors[self.loc_map.get(neighbor)]
#
#     def compute_neighbors(self):
#         if self.row % 2 == 0:
#             self.neighbors = [(self.row-1, self.col+1),
#                               (self.row, self.col+1),
#                               (self.row+1, self.col+1),
#                               (self.row+1, self.col),
#                               (self.row, self.col-1),
#                               (self.row-1, self.col)]
#         else:
#             self.neighbors = [(self.row-1, self.col),
#                               (self.row, self.col+1),
#                               (self.row+1, self.col),
#                               (self.row+1, self.col-1),
#                               (self.row, self.col-1),
#                               (self.row-1, self.col-1)]
#
#     def __str__(self):
#         return self.string
#
#     __repr__ = __str__
#
# class Sea(Hex):
#     def __init__(self,loc):
#         self.name = "sea"
#         super().__init__(loc)
#
# class Hill(Hex):
#     def __init__(self,loc):
#         self.name = "hill"
#         super().__init__(loc)
#
# class Pasture(Hex):
#     def __init__(self,loc):
#         self.name = "pasture"
#         super().__init__(loc)
#
# class Mountain(Hex):
#     def __init__(self,loc):
#         self.name = "mountain"
#         super().__init__(loc)
#
# class Field(Hex):
#     def __init__(self,loc):
#         self.name = "field"
#         super().__init__(loc)
#
# class Forest(Hex):
#     def __init__(self,loc):
#         self.name = "forest"
#         super().__init__(loc)
#
# class Desert(Hex):
#     def __init__(self,loc):
#         self.name = "desert"
#         super().__init__(loc)
#
# def parse_boardstring(board):
#     '''
#     Converts string representation to CatanBoard object.
#     '''
#     current_board = []
#     current_row = []
#
#     for char in board:
#         if char == "\n":
#             current_board.append(current_row)
#             current_row = []
#         elif char != " ":
#             current_row.append(hex_map[char]((len(current_board),len(current_row))))
#
#     return CatanBoard(current_board)
#
# def parse_boardlist(board):
#     '''
#     Converts list of strings representation to CatanBoard object.
#     '''
#     board = deepcopy(board)
#
#     for row in range(len(board)):
#         for col in range(len(board[row])):
#             board[row][col] = hex_map[board[row][col]]((row,col))
#
#     return CatanBoard(board)
#
# def random_board(template=None, hexes=None):
#     '''
#     Generates a randomized list representation from a template and hex counts.
#     '''
#     if not hexes:
#         hexes = {'H':3,
#                  'P':4,
#                  'M':3,
#                  'F':4,
#                  'W':4,
#                  'D':1}
#
#     if not template:
#         template = [['-','-','-','-','-','-','-'],
#                     ['-','-','L','L','L','-','-'],
#                     ['-','L','L','L','L','-','-'],
#                     ['-','L','L','L','L','L','-'],
#                     ['-','L','L','L','L','-','-'],
#                     ['-','-','L','L','L','-','-'],
#                     ['-','-','-','-','-','-','-']]
#
#     hex_arragement = []
#
#     for key,value in hexes.items():
#         for _ in range(value):
#             hex_arragement.append(key)
#     shuffle(hex_arragement)
#
#     hex_index = 0
#     output_arrangement = deepcopy(template)
#
#     for row in range(len(template)):
#         for col in range(len(template[row])):
#             if output_arrangement[row][col] == "L":
#                 output_arrangement[row][col] = hex_arragement[hex_index]
#                 hex_index += 1
#
#     return output_arrangement
#
# def random_numbers(template=None, numbers=None):
#     '''
#     Generates a randomized list representation from a template and num counts.
#     '''
#     if not numbers:
#         numbers = {2:1, 3:2, 4:2, 5:2, 6:2, 8:2, 9:2, 10:2, 11:2, 12:1}
#
#     return random_board(template, numbers)
#
# def generate_fair(gen_limit=2000, best_limit=20, template=None, hexes=None, numbers=None):
#     '''
#     Generates a fair hex distribution board.
#     '''
#
#     def generate_nonadjacent():
#         '''
#         Generates a board without adjacent identical hexes.
#         '''
#         counter = 0
#         for _ in range(gen_limit):
#             counter += 1
#             cur_board = parse_boardlist(random_board(template, hexes))
#             board_score = cur_board.hex_adj_score()
#             if board_score == 2:
#                 start_hex = cur_board.adjacent_identical()[0]
#                 start_hex_row = start_hex.row
#                 start_hex_col = start_hex.col
#                 for row in range(cur_board.height):
#                     for col in range(cur_board.width):
#                         if cur_board.board[row][col].name != "sea":
#                             cur_board.swap_hex(start_hex_row, start_hex_col, row, col)
#                             if cur_board.check_swap(start_hex_row, start_hex_col, row, col):
#                                 return cur_board
#                             cur_board.swap_hex(start_hex_row, start_hex_col, row, col)
#             elif board_score == 0:
#                 return cur_board
#         return None
#
#     def generate_spread():
#         '''
#         Returns the board with the best randomized resource distribution.
#         '''
#         best_board = []
#         best_score = -float('inf')
#         worst_board = []
#         worst_score = float('inf')
#         for _ in range(best_limit):
#             cur_board = generate_nonadjacent()
#             cur_score = cur_board.resource_score()
#             # print(cur_score)
#             if cur_score > best_score:
#                 best_board = cur_board
#                 best_score = cur_score
#             if cur_score < worst_score:
#                 worst_board = cur_board
#                 worst_score = cur_score
#
#         # print(best_score)
#         # print(worst_score)
#         return best_board, worst_board
#
#     def generate_nonadjacent_numbers(board):
#         '''
#         Generates a list representation of numbers without adjacent numbers.
#         '''
#         def swap_2d(A, row1, col1, row2, col2):
#             A[row1][col1], A[row2][col2] = A[row2][col2], A[row1][col1]
#
#         cur_board = board
#         template = cur_board.create_template()
#         for _ in range(gen_limit):
#             cur_numbers = random_numbers(template, numbers)
#             cur_board.apply_numbers(cur_numbers)
#             board_score = cur_board.numbers_adj_score()
#             if board_score == 2:
#                 start_hex = cur_board.adjacent_identical(numbers=True)[0]
#                 start_hex_row = start_hex.row
#                 start_hex_col = start_hex.col
#                 for row in range(cur_board.height):
#                     for col in range(cur_board.width):
#                         if cur_board.board[row][col].name not in {'sea','desert'}:
#                             cur_board.swap_number(start_hex_row, start_hex_col, row, col)
#                             if cur_board.check_swap(start_hex_row, start_hex_col, row, col, numbers=True):
#                                 swap_2d(cur_numbers, start_hex_row, start_hex_col, row, col)
#                                 return cur_numbers
#                             cur_board.swap_number(start_hex_row, start_hex_col, row, col)
#             elif board_score == 0:
#                 return cur_numbers
#         return None
#
#     def generate_uniform_numbers():
#         '''
#         Generates a board with similar number values for each resource type.
#         '''
#
#         best_numbers = []
#         best_score = -float('inf')
#         spread_board = generate_spread()[0]
#         var_scores = []
#         num_scores = []
#         val_scores = []
#         red_scores = []
#         for _ in range(best_limit*25):
#             cur_numbers = generate_nonadjacent_numbers(spread_board)
#             spread_board.apply_numbers(cur_numbers)
#             cur_score = spread_board.normalized_num_score()
#             var_scores.append(spread_board.variety_score())
#             num_scores.append(spread_board.numbers_score())
#             val_scores.append(spread_board.value_score())
#             red_scores.append(spread_board.redundency_score())
#             if cur_score > best_score:
#                 best_numbers = cur_numbers
#                 best_score = cur_score
#
#         spread_board.apply_numbers(best_numbers)
#         # print('Max variety', max(var_scores))
#         # print('Max numbers', max(num_scores))
#         # print('Max value', max(val_scores))
#         # print('Max redundency', max(red_scores))
#         return spread_board
#
#     return generate_uniform_numbers()
#
# hex_map = {'H':Hill,
#            'P':Pasture,
#            'M':Mountain,
#            'W':Field,
#            'F':Forest,
#            'D':Desert,
#            '-':Sea}

if __name__ == '__main__':

    preset = [['-','-','-','-','-','-','-','-','-'],
              ['-','-','-','-','-','-','-','-','-'],
              ['-','-','-','-','-','-','-','-','-'],
              ['-','-','-','H','H','H','-','-','-'],
              ['-','-','H','H','H','H','-','-','-'],
              ['-','-','H','H','D','H','H','-','-'],
              ['-','-','H','H','H','H','-','-','-'],
              ['-','-','-','H','H','H','-','-','-'],
              ['-','-','-','-','-','-','-','-','-'],
              ['-','-','-','-','-','-','-','-','-']]

    print(json.dumps(preset))
    # t = parse_boardlist(preset).create_template()
    # h = None
    # n = None
    #
    # board = generate_fair(template=t, hexes=h, numbers=n)
    # # board.display()
    # print(json.dumps(board.create_boardlist()))

    # board_list = [["F","F","F","F","F"],["F","D","F","F","F"],["F","F","F","F","F"],["F","F","F","F","F"]]
    #
    # # print(board_list)
    # print(json.dumps(board_list))

    # scenario = None
    # players = None
    # valid = sorted(list(set([key[0] for key in board_presets.scenarios.keys()])))
    # user_input = ''
    #
    # while user_input.lower() != 'quit':
    #     if not scenario or user_input.lower() == 'reset':
    #         players = None
    #         scenario = None
    #
    #         user_input = input("Enter preset name ('LIST' for available scenarios): ")
    #
    #         if user_input not in valid or user_input.lower() == 'list':
    #             print("Valid presets: ")
    #             for preset in valid:
    #                 print('-)', preset)
    #
    #         else:
    #             scenario = user_input
    #
    #     elif not players:
    #         user_input = input("Enter player count (3 or 4): ")
    #
    #         if user_input not in {'3','4'}:
    #             print("Only 3-4 players presets available.")
    #         else:
    #             players = int(user_input)
    #     else:
    #         preset = board_presets.scenarios[(scenario, players)]
    #         t = parse_boardstring(preset.boardstring).create_template()
    #         h = preset.hexes
    #         n = preset.numbers
    #
    #         print('================')
    #         board = generate_fair(template=t, hexes=h, numbers=n)
    #         print('================')
    #         board.display()
    #         print('================')
    #         board.display(True)
    #         print('================')
    #         board.display_details()
    #         print('================')
    #
    #         user_input = input("Enter to generate again, 'RESET' for new scenario, 'QUIT' to stop: ")

    # s = ('- - - - - - -\n'
    #     '- - H H H - -\n'
    #      '- H H H H H -\n'
    #     '- - - - - - -\n'
    #      '- - - H - - -\n'
    #     '- - - H - - -\n'
    #      '- - - - - - -\n'
    #     '- H H H H H -\n'
    #      '- - H H H - -\n'
    #     '- - - - - - -\n')
    #
    # c = parse_boardstring(s)
    # t = c.create_template()
    # h = {'W':4,
    #      'H':3,
    #      'M':3,
    #      'P':4,
    #      'F':4}
    # n = {2:1,
    #      3:2,
    #      4:2,
    #      5:2,
    #      6:2,
    #      8:2,
    #      9:2,
    #      10:2,
    #      11:2,
    #      12:1}
    #
    # b = generate_fair(best_limit=50, template=t, hexes=h, numbers=n)
    # # b = generate_fair()
    # print('================')
    # b.display()
    # print('================')
    # b.display(True)
    # print('================')
    # b.display_details()

    # EXAMPLE BOARD STRING
    # s = ("- - - - - - -\n"
    #     "- - W P F - -\n"
    #      "- F M D P - -\n"
    #     "- H P W M F -\n"
    #      "- M F H W - -\n"
    #     "- - H W P - -\n"
    #      "- - - - - - -\n")

    # EXAMPLE BOARD LIST
    # l = [['-','-','-','-','-','-','-'],
    #      ['-','-','W','P','F','-','-'],
    #      ['-','F','M','P','D','-','-'],
    #      ['-','H','P','W','M','F','-'],
    #      ['-','M','H','F','W','-','-'],
    #      ['-','-','H','W','P','-','-'],
    #      ['-','-','-','-','-','-','-']]

    pass
