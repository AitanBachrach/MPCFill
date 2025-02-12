from typing import Any

from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from django.utils import dateformat

from cardpicker.constants import DATE_FORMAT
from cardpicker.models import Card

# region new API

# when the old (django template-based) UI is fully decommissioned, we can reduce the amount of data stored in
# elasticsearch by replacing the code in the `old API` region below with this code.


# @registry.register_document
# class CardSearch(Document):
#     source = fields.TextField(attr="get_source_key", analyzer="keyword")
#     searchq_keyword = fields.TextField(analyzer="keyword")
#     card_type = fields.KeywordField()
#
#     class Index:
#         # name of the elasticsearch index
#         name = "cards"
#         # see Elasticsearch Indices API reference for available settings
#         settings = {"number_of_shards": 5, "number_of_replicas": 0}
#
#     class Django:
#         model = Card
#         fields = ["identifier", "priority", "dpi", "searchq", "date", "size"]

# endregion

# region old API


@registry.register_document
class CardSearch(Document):
    source = fields.TextField(attr="get_source_key", analyzer="keyword")
    source_name = fields.TextField(attr="get_source_name")
    source_external_link = fields.TextField(attr="get_source_external_link")
    source_type = fields.TextField(attr="get_source_type")
    download_link = fields.TextField(attr="get_download_link")
    small_thumbnail_url = fields.TextField(attr="get_small_thumbnail_url")
    medium_thumbnail_url = fields.TextField(attr="get_medium_thumbnail_url")
    searchq_keyword = fields.TextField(analyzer="keyword")
    card_type = fields.KeywordField()

    class Index:
        # name of the elasticsearch index
        name = "cards"
        # see Elasticsearch Indices API reference for available settings
        settings = {"number_of_shards": 5, "number_of_replicas": 0}

    class Django:
        model = Card
        fields = ["identifier", "name", "priority", "source_verbose", "dpi", "extension", "searchq", "date", "size"]

    def to_dict(self, **kwargs: Any) -> dict[str, Any]:
        return {
            "identifier": self.identifier,
            "card_type": self.card_type,
            "name": self.name,
            "priority": self.priority,
            "source": self.source,
            "source_name": self.source_name,
            "source_external_link": self.source_external_link or "",
            "source_verbose": self.source_verbose,
            "source_type": self.source_type,
            "dpi": self.dpi,
            "searchq": self.searchq,
            "extension": self.extension,
            "date": dateformat.format(self.date, DATE_FORMAT),
            "size": self.size,
            "download_link": self.download_link,
            "small_thumbnail_url": self.small_thumbnail_url,
            "medium_thumbnail_url": self.medium_thumbnail_url,
        }


# endregion
