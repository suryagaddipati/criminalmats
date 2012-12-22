require 'shopify_api'
require 'nokogiri'
require 'open-uri'
require 'htmlentities'
require 'unicode'

require 'active_support/all'


def import_product(url,cat)
  doc = Nokogiri::HTML(open(url))


  title = extract_title(doc)
  description = extract_description(doc)
  colors = extract_colors(doc)
  sizes = extract_sizes(doc)
  specifications = extract_specifications(doc)
  product_type =cat 
  features = []
  features = extract_features(doc)
  # extract_images(doc)
  data = {title:title, description: description, colors: colors, sizes: sizes, specifications: specifications , features: features , product_type: product_type}

 File.open("durable/#{title}.yml", 'w') { |file| file.write(data.to_yaml) }
end




def extract_features(doc)
  []
end

def extract_specifications(doc)
  []
end

def extract_title(doc)
  doc.css('.product-name').children.first.content.strip
end

def extract_description(doc)
  doc.css('.description_alt').first.to_html
end

def extract_colors(doc)
  doc.css('.listing-item h6').map {|x| x.text.strip}
end
def extract_sizes(doc)
  doc.css('.model .product td').map {|x| x.text}.in_groups_of(4).map {|x| x[2]}
end




import_product('http://www.durablecorp.com/mats-flooring/anti-fatigue/industrial-factory/bubble-mat-industrial-mats.html','')
# import_product('http://www.andersenco.com/ProductPages/InteriorMats/CleanStride.aspx')
# import_products
