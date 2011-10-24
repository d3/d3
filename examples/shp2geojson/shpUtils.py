from struct import unpack
import dbfUtils, math
XY_POINT_RECORD_LENGTH = 16
db = []

def loadShapefile(file_name):
        global db
        shp_bounding_box = []
        shp_type = 0
        file_name = file_name
        records = []
        # open dbf file and get records as a list
        dbf_file = file_name[0:-4] + '.dbf'
        dbf = open(dbf_file, 'rb')
        db = list(dbfUtils.dbfreader(dbf))
        dbf.close()
        fp = open(file_name, 'rb')
        
        # get basic shapefile configuration
        fp.seek(32)
        shp_type = readAndUnpack('i', fp.read(4))                
        shp_bounding_box = readBoundingBox(fp)
        
        # fetch Records
        fp.seek(100)
        while True:
                shp_record = createRecord(fp)
                if shp_record == False:
                        break
                records.append(shp_record)
        
        return records    

record_class = {0:'RecordNull', 1:'RecordPoint', 8:'RecordMultiPoint', 3:'RecordPolyLine', 5:'RecordPolygon'}

def createRecord(fp):
        # read header
        record_number = readAndUnpack('>L', fp.read(4))
        if record_number == '':
                print 'doner'
                return False
        content_length = readAndUnpack('>L', fp.read(4))
        record_shape_type = readAndUnpack('<L', fp.read(4))

        shp_data = readRecordAny(fp,record_shape_type)
        dbf_data = {}
        for i in range(0,len(db[record_number+1])):
                dbf_data[db[0][i]] = db[record_number+1][i]
        
        return {'shp_data':shp_data, 'dbf_data':dbf_data}       
        
# Reading defs

def readRecordAny(fp, type):
        if type==0:
                return readRecordNull(fp)
        elif type==1:
                return readRecordPoint(fp)
        elif type==8:
                return readRecordMultiPoint(fp)
        elif type==3 or type==5:
                return readRecordPolyLine(fp)
        else:
                return False

def readRecordNull(fp):
        data = {}
        return data

point_count = 0
def readRecordPoint(fp):
        global point_count
        data = {}
        data['x'] = readAndUnpack('d', fp.read(8))
        data['y'] = readAndUnpack('d', fp.read(8))
        point_count += 1
        return data

    
def readRecordMultiPoint(fp):
        data = readBoundingBox(fp)
        data['numpoints'] = readAndUnpack('i', fp.read(4))        
        for i in range(0,data['numpoints']):
                data['points'].append(readRecordPoint(fp))
        return data

    
def readRecordPolyLine(fp):
        data = readBoundingBox(fp)
        data['numparts']  = readAndUnpack('i', fp.read(4))
        data['numpoints'] = readAndUnpack('i', fp.read(4))
        data['parts'] = []
        for i in range(0, data['numparts']):
                data['parts'].append(readAndUnpack('i', fp.read(4)))
        points_initial_index = fp.tell()
        points_read = 0
        for part_index in range(0, data['numparts']):
                point_index = data['parts'][part_index]
                
                # if(!isset(data['parts'][part_index]['points']) or !is_array(data['parts'][part_index]['points'])):
                data['parts'][part_index] = {}
                data['parts'][part_index]['points'] = []
                
                # while( ! in_array( points_read, data['parts']) and points_read < data['numpoints'] and !feof(fp)):
                checkPoint = []
                while (points_read < data['numpoints']):
                        currPoint = readRecordPoint(fp)
                        data['parts'][part_index]['points'].append(currPoint)
                        points_read += 1
                        if points_read == 0 or checkPoint == []:
                                checkPoint = currPoint
                        elif currPoint == checkPoint:
                                checkPoint = []
                                break
                        
        fp.seek(points_initial_index + (points_read * XY_POINT_RECORD_LENGTH))
        return data

# General defs
    
def readBoundingBox(fp):
        data = {}
        data['xmin'] = readAndUnpack('d',fp.read(8))
        data['ymin'] = readAndUnpack('d',fp.read(8))
        data['xmax'] = readAndUnpack('d',fp.read(8))
        data['ymax'] = readAndUnpack('d',fp.read(8))
        return data

def readAndUnpack(type, data):
        if data=='': return data
        return unpack(type, data)[0]


####
#### additional functions
####

def getCentroids(records, projected=False):
        # for each feature
        if projected:
                points = 'projectedPoints'
        else:
                points = 'points'
                
        for feature in records:
                numpoints = cx = cy = 0
                for part in feature['shp_data']['parts']:
                        for point in part[points]:
                                numpoints += 1
                                cx += point['x']
                                cy += point['y']
                cx /= numpoints
                cy /= numpoints
                feature['shp_data']['centroid'] = {'x':cx, 'y':cy}
                                
                
def getBoundCenters(records):
        for feature in records:
                cx = .5 * (feature['shp_data']['xmax']-feature['shp_data']['xmin']) + feature['shp_data']['xmin']
                cy = .5 * (feature['shp_data']['ymax']-feature['shp_data']['ymin']) + feature['shp_data']['ymin']
                feature['shp_data']['boundCenter'] = {'x':cx, 'y':cy}
        
def getTrueCenters(records, projected=False):
        #gets the true polygonal centroid for each feature (uses largest ring)
        #should be spherical, but isn't

        if projected:
                points = 'projectedPoints'
        else:
                points = 'points'
                
        for feature in records:
                maxarea = 0
                for ring in feature['shp_data']['parts']:
                        ringArea = getArea(ring, points)
                        if ringArea > maxarea:
                                maxarea = ringArea
                                biggest = ring
                #now get the true centroid
                tempPoint = {'x':0, 'y':0}
                if biggest[points][0] != biggest[points][len(biggest[points])-1]:
                        print "mug", biggest[points][0], biggest[points][len(biggest[points])-1]
                for i in range(0, len(biggest[points])-1):
                        j = (i + 1) % (len(biggest[points])-1)
                        tempPoint['x'] -= (biggest[points][i]['x'] + biggest[points][j]['x']) * ((biggest[points][i]['x'] * biggest[points][j]['y']) - (biggest[points][j]['x'] * biggest[points][i]['y']))
                        tempPoint['y'] -= (biggest[points][i]['y'] + biggest[points][j]['y']) * ((biggest[points][i]['x'] * biggest[points][j]['y']) - (biggest[points][j]['x'] * biggest[points][i]['y']))
                        
                tempPoint['x'] = tempPoint['x'] / ((6) * maxarea)
                tempPoint['y'] = tempPoint['y'] / ((6) * maxarea)
                feature['shp_data']['truecentroid'] = tempPoint
                

def getArea(ring, points):
        #returns the area of a polygon
        #needs to be spherical area, but isn't
        area = 0
        for i in range(0,len(ring[points])-1):
                j = (i + 1) % (len(ring[points])-1)
                area += ring[points][i]['x'] * ring[points][j]['y']
                area -= ring[points][i]['y'] * ring[points][j]['x']
                        
        return math.fabs(area/2)
        

def getNeighbors(records):
        
        #for each feature
        for i in range(len(records)):
                #print i, records[i]['dbf_data']['ADMIN_NAME']
                if not 'neighbors' in records[i]['shp_data']:
                        records[i]['shp_data']['neighbors'] = []
                
                #for each other feature
                for j in range(i+1, len(records)):
                        numcommon = 0
                        #first check to see if the bounding boxes overlap
                        if overlap(records[i], records[j]):
                                #if so, check every single point in this feature to see if it matches a point in the other feature
                                
                                #for each part:
                                for part in records[i]['shp_data']['parts']:
                                        
                                        #for each point:
                                        for point in part['points']:
                                                
                                                for otherPart in records[j]['shp_data']['parts']:
                                                        if point in otherPart['points']:
                                                                numcommon += 1
                                                                if numcommon == 2:
                                                                        if not 'neighbors' in records[j]['shp_data']:
                                                                                records[j]['shp_data']['neighbors'] = []
                                                                        records[i]['shp_data']['neighbors'].append(j)
                                                                        records[j]['shp_data']['neighbors'].append(i)
                                                                        #now break out to the next j
                                                                        break
                                                if numcommon == 2:
                                                        break
                                        if numcommon == 2:
                                                break
                                
                                                                        
                                                                
                                                                
def projectShapefile(records, whatProjection, lonCenter=0, latCenter=0):
        print 'projecting to ', whatProjection
        for feature in records:
                for part in feature['shp_data']['parts']:
                        part['projectedPoints'] = []
                        for point in part['points']:
                                tempPoint = projectPoint(point, whatProjection, lonCenter, latCenter)
                                part['projectedPoints'].append(tempPoint)

def projectPoint(fromPoint, whatProjection, lonCenter, latCenter):
        latRadians = fromPoint['y'] * math.pi/180
        if latRadians > 1.5: latRadians = 1.5
        if latRadians < -1.5: latRadians = -1.5
        lonRadians = fromPoint['x'] * math.pi/180
        lonCenter = lonCenter * math.pi/180
        latCenter = latCenter * math.pi/180
        newPoint = {}
        if whatProjection == "MERCATOR":
                newPoint['x'] = (180/math.pi) * (lonRadians - lonCenter)
                newPoint['y'] = (180/math.pi) * math.log(math.tan(latRadians) + (1/math.cos(latRadians)))
                if newPoint['y'] > 200:
                        newPoint['y'] = 200
                if newPoint['y'] < -200:
                        newPoint['y'] = 200
                return newPoint
        if whatProjection == "EQUALAREA":
                newPoint['x'] = 0
                newPoint['y'] = 0
                return newPoint
                

def overlap(feature1, feature2):
        if (feature1['shp_data']['xmax'] > feature2['shp_data']['xmin'] and feature1['shp_data']['ymax'] > feature2['shp_data']['ymin'] and feature1['shp_data']['xmin'] < feature2['shp_data']['xmax'] and feature1['shp_data']['ymin'] < feature2['shp_data']['ymax']):
                return True
        else:
                return False
