import unittest
from volvox_biodb_test import AbstractVolvoxBiodbTest

class VolvoxBiodbTest121 ( AbstractVolvoxBiodbTest, unittest.TestCase ):

    data_dir = 'tests/data/volvox_formatted_1_2_1/'

    def setUp( self ):
        # skip calling VolvoxBiodbTest's setUp, cause we are not
        # actually running any formatting
        super( AbstractVolvoxBiodbTest, self ).setUp()
