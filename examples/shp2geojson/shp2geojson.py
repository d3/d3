#original script from Vadim Ogievetsky modified by Vincent Hiribarren

# load the shapefile, populating a list of dictionaries
import shpUtils


shpRecords = shpUtils.loadShapefile('your_file.shp')

# now do whatever you want with the resulting data
# i'm going to just print out the first feature in this shapefile
#print '[[[', shpRecords[3] , ']]]'

print '{"type":"FeatureCollection","features":['

for record in shpRecords:
   dbf = record['dbf_data']
   shp = record['shp_data']
   name = dbf['NAME'].strip().replace("'","\\'")
   code = dbf['ID'] # or FIPS or ISO3 or UN 
   borders = []
   for part in shp.get('parts', []):
       border = []
       for point in part['points']:
           border.append('[%.6f, %.6f]' % (point['x'], point['y']))
           
       border = ','.join(border) 
       borders.append('[' + border + ']')
       
   borders = '[' + ','.join(borders) + ']'
   
   str = '{"type":"Feature","properties":{"name":"%s","code":"%s"},"geometry":{"type":"MultiPolygon","coordinates":[%s]}},' % (name, code, borders)
   print (str)
   
print ']}'

print """

"""