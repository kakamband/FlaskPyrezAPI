
import asyncio

from discord_bot import Bot#, main
from utils import get_env
#from utils.discord import DiscordConfig
from utils.loop import get as get_event_loop

if __name__ == '__main__':
  asyncio.set_event_loop(get_event_loop())
  #bot = Bot(config=DiscordConfig())
  bot = Bot()
  bot.config.from_object('config.Discord')
  bot.config.from_pyfile('config/discord.cfg', silent=True)
  try:
  	bot.run(debug=True)
  except Exception as e:
  	print(f'Whoops, bot failed to connect to Discord.\n\n{e}')
  #main()
"""
def __init__(self, *, _config='data/config.json'):
	#./../config/config.json
	self.load(_config)
def load(self, path):
	import os
	if not os.path.isfile(path):#os.path.isdir(path)
		path = './../data/config.json'#os.join(path, 'config.json')
	from utils.file import read_file
	self.__kwargs__ = read_file(path, is_json=True)
"""
